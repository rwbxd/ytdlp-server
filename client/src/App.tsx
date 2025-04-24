import { useEffect, useState } from "react";
import "./App.css";
import { DownloadRequest, getServerOptions, sendDownloadRequest } from "./api";
import { GithubLogo } from "@phosphor-icons/react";

function App() {
  const [subfolders, setSubfolders] = useState([] as string[]);
  const [resolutions, setResolutions] = useState([] as string[]);
  const [formats, setFormats] = useState([] as string[]);

  useEffect(function getInitialData() {
    getServerOptions().then((serverOptions) => {
      console.log(serverOptions);
      setSubfolders(serverOptions.subfolders);
      setResolutions(serverOptions.resolutions);
      setFormats(serverOptions.formats);
    });
  }, []);

  async function submitDownloadRequest(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    sendDownloadRequest(
      Object.fromEntries(formData.entries()) as DownloadRequest,
    ).then((res) => console.log(res));
    console.log(Object.fromEntries(formData.entries()));
  }

  return (
    <>
      <div className="app">
        <h1 className="header">
          <span className="youtube-header">Youtube</span>2
          <span className="plex-header">Plex</span>
        </h1>
        <form onSubmit={submitDownloadRequest} className="download-form">
          <input name="url" placeholder="https://youtu.be/jNQXAC9IVRw"></input>
          <div className="download-options">
            <select name="subfolder" hidden={!(subfolders.length > 1)}>
              {subfolders.map((subfolder) => {
                return (
                  <option key={subfolder} value={subfolder}>
                    {subfolder}
                  </option>
                );
              })}
            </select>
            <select name="res" hidden={!(resolutions.length > 1)}>
              {resolutions.map((res) => {
                return (
                  <option key={res} value={res}>
                    {res}
                  </option>
                );
              })}
            </select>
            <select name="format" hidden={!(formats.length > 1)}>
              {formats.map((format) => {
                return (
                  <option key={format} value={format}>
                    {format}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="download-button">
            Download
          </button>
        </form>
      </div>
      <footer>
        <a href="https://github.com/rwbxd/ytdlp-server">
          <GithubLogo size={32} color="white" />
        </a>
      </footer>
    </>
  );
}

export default App;
