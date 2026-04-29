import "@testing-library/jest-dom";

// Skip the MFSA splash screen during tests so we can see actual UI.
beforeAll(() => {
  try {
    sessionStorage.setItem("mfsa_splash_done", "1");
  } catch {
    // ignore
  }
});

