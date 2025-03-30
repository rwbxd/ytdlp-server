import { useEffect, useState } from "react";
import "./App.css";
import {
  DownloadRequest,
  getServerOptions,
  listOutput,
  sendDownloadRequest,
} from "./api";

function App() {
  const [files, setFiles] = useState([] as string[]);
  const [subfolders, setSubfolders] = useState([] as string[]);
  const [resolutions, setResolutions] = useState([] as string[]);
  const [formats, setFormats] = useState([] as string[]);

  async function getFilesInDir() {
    const output = await listOutput();
    setFiles(output);
  }

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
        <form onSubmit={submitDownloadRequest}>
          <div>
            <input name="url"></input>
          </div>
          <div>
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
          <div>
            <button type="submit">Download</button>
          </div>
        </form>
        <button onClick={getFilesInDir}>List Files</button>
        <p>Files array is {files.length ? "not empty" : "empty"}</p>
        <ul>
          {files.map((fileName) => {
            return <li key={fileName}>{fileName}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
