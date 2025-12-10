package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

// licenseResponse is serialized to the Next.js application.
type licenseResponse struct {
	Valid     bool            `json:"valid"`
	Edition   string          `json:"edition"`
	Features  map[string]bool `json:"features"`
	ExpiresAt string          `json:"expires_at"`
	Message   string          `json:"message,omitempty"`
}

func main() {
	if _, err := LoadLicenseFromEnv(); err != nil {
		log.Fatalf("unable to start: %v", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/internal/license", func(w http.ResponseWriter, r *http.Request) {
		license := GetLicenseSnapshot()
		if license == nil {
			respondJSON(w, http.StatusServiceUnavailable, licenseResponse{Valid: false, Edition: "unknown", Features: map[string]bool{}, Message: "license unavailable"})
			return
		}

		resp := licenseResponse{
			Valid:     true,
			Edition:   license.Edition,
			Features:  license.Features,
			ExpiresAt: license.ExpiresAt.UTC().Format(time.RFC3339),
		}

		respondJSON(w, http.StatusOK, resp)
	})

	addr := ":8080"
	if envAddr := os.Getenv("LICENSE_SERVER_ADDR"); envAddr != "" {
		addr = envAddr
	}

	server := &http.Server{
		Addr:    addr,
		Handler: mux,
	}

	log.Printf("license server ready on %s", addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("license server stopped: %v", err)
	}
}

func respondJSON(w http.ResponseWriter, status int, payload licenseResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to serialize license response: %v", err)
	}
}
