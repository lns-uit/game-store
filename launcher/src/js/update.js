const uaup = require('uaup-js');

const defaultStages = {
  Checking: "Checking For Update...", // When Checking For Updates.
  Found: "Update Available!",  // If an Update is Found.
  NotFound: "No Update Available.", // If an Update is Not Found.
  Downloading: "Downloading...", // When Downloading Update.
  Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
  Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
  Launch: "Launching..." // When Launching the Application.
};
window.onload = () => {
    const updateOptions = {
        gitRepo: "game-launcher", // [Required] Your Repo Name
        gitUsername: "nguyenphuc1040",  // [Required] Your GitHub Username.

        appName: "stun", //[Required] The Name of the app archive and the app folder.
        appExecutableName: "Stun.exe", //[Required] The Executable of the Application to be Run after updating.

        progressBar: document.getElementById("download"), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
        label: document.getElementById("download-label"), 
        forceUpdate: false,
        stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
    };
    uaup.Update(updateOptions);
}

