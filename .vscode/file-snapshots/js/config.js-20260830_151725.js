const AVAILABLE_SERVERS = 3;
const PANEL_URL = "https://pannel.johnhost.xyz";
const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeMoM9Sh7ejZdHiC1GeXEk_gjFyq5xsM-4CfGjZEogRGzT62A/viewform?usp=header";

// availableServers: set to 0 to switch every apply button to Out of stock
// panelUrl: the control panel link
// applicationFormUrl: the application form link
window.__JOHNHOST_CONFIG__ = {
  availableServers: AVAILABLE_SERVERS,
  panelUrl: PANEL_URL,
  applicationFormUrl: APPLICATION_FORM_URL
};