package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"os"
	"sync"
	"time"
)

// License defines the offline license payload written to license.json.
//
//	{
//	  "edition": "enterprise" | "community",
//	  "features": { "meter": true, "workflow": false },
//	  "expires_at": "2026-01-01T00:00:00Z"
//	}
type License struct {
	Edition   string          `json:"edition"`
	Features  map[string]bool `json:"features"`
	ExpiresAt time.Time       `json:"expires_at"`
}

var (
	// GlobalLicense caches the validated license in memory for the entire process lifetime.
	GlobalLicense *License
	licenseMu     sync.RWMutex
)

var (
	errMissingLicensePayload   = errors.New("missing SMALLBIZNIS_LICENSE_JSON")
	errMissingLicenseSignature = errors.New("missing SMALLBIZNIS_LICENSE_SIGNATURE")
	errMissingPublicKey        = errors.New("missing SMALLBIZNIS_LICENSE_PUBLIC_KEY")
)

// LoadLicenseFromEnv reads the license JSON, validates the RSA signature, checks expiration,
// and stores it in the GlobalLicense cache. It is intended to run exactly once at startup.
func LoadLicenseFromEnv() (*License, error) {
	rawLicense := os.Getenv("SMALLBIZNIS_LICENSE_JSON")
	if rawLicense == "" {
		return nil, errMissingLicensePayload
	}

	signatureB64 := os.Getenv("SMALLBIZNIS_LICENSE_SIGNATURE")
	if signatureB64 == "" {
		return nil, errMissingLicenseSignature
	}

	publicKeyPEM := os.Getenv("SMALLBIZNIS_LICENSE_PUBLIC_KEY")
	if publicKeyPEM == "" {
		return nil, errMissingPublicKey
	}

	if err := VerifyLicenseSignature([]byte(rawLicense), signatureB64, publicKeyPEM); err != nil {
		return nil, fmt.Errorf("invalid license signature: %w", err)
	}

	var license License
	if err := json.Unmarshal([]byte(rawLicense), &license); err != nil {
		return nil, fmt.Errorf("unable to parse license: %w", err)
	}

	if err := license.Validate(); err != nil {
		return nil, err
	}

	licenseMu.Lock()
	GlobalLicense = &license
	licenseMu.Unlock()

	return &license, nil
}

// VerifyLicenseSignature validates the RSA-SHA256 signature against the provided payload and public key.
func VerifyLicenseSignature(payload []byte, signatureB64 string, publicKeyPEM string) error {
	block, _ := pem.Decode([]byte(publicKeyPEM))
	if block == nil {
		return errors.New("invalid public key PEM")
	}

	pubKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return fmt.Errorf("invalid public key format: %w", err)
	}

	rsaKey, ok := pubKey.(*rsa.PublicKey)
	if !ok {
		return errors.New("public key is not RSA")
	}

	signature, err := base64.StdEncoding.DecodeString(signatureB64)
	if err != nil {
		return fmt.Errorf("invalid base64 signature: %w", err)
	}

	sum := sha256.Sum256(payload)
	if err := rsa.VerifyPKCS1v15(rsaKey, crypto.SHA256, sum[:], signature); err != nil {
		return fmt.Errorf("signature verification failed: %w", err)
	}

	return nil
}

// Validate enforces expiration and basic structure checks.
func (l *License) Validate() error {
	if l.Edition == "" {
		return errors.New("edition is required")
	}

	if l.Features == nil {
		l.Features = map[string]bool{}
	}

	if l.ExpiresAt.IsZero() {
		return errors.New("expires_at is required")
	}

	if time.Now().After(l.ExpiresAt) {
		return errors.New("license expired")
	}

	return nil
}

// SignLicense is a helper for tests or provisioning flows to generate a detached signature.
// It is not called in production boot but provided for completeness.
func SignLicense(payload []byte, privateKey *rsa.PrivateKey) (string, error) {
	hash := sha256.Sum256(payload)
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hash[:])
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(signature), nil
}

// GetLicenseSnapshot safely returns the cached license pointer.
func GetLicenseSnapshot() *License {
	licenseMu.RLock()
	defer licenseMu.RUnlock()
	return GlobalLicense
}
