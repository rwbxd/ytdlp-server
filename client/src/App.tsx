import { useEffect, useState } from 'react'
import './App.css'
import { DownloadRequest, listOutput, listSubfolders, sendDownloadRequest } from './api';

function App() {
  const [files, setFiles] = useState([] as string[]);
  const [subfolders, setSubfolders] = useState([] as string[]);

  async function getFilesInDir() {
    const output = await listOutput();
    setFiles(output);
  }

  useEffect(() => {
    listSubfolders().then(subfolders => {
      setSubfolders(subfolders);
    });
  }, [])

  async function submitDownloadRequest(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    sendDownloadRequest(Object.fromEntries(formData.entries()) as DownloadRequest)
      .then(res => console.log(res))
    console.log(Object.fromEntries(formData.entries()));
  }

  return (
    <>
      <div>
        <p>Hello world</p>
        <form onSubmit={submitDownloadRequest}>
          <div>
            <input name="url"></input>
          </div>
          <div>
            <select name="subfolder" hidden={!(subfolders.length > 1)}>
              {subfolders.map(subfolder => { return <option key="subfolder" value={subfolder}>{subfolder}</option> })}
            </select>
            <select name="res">
              <option value="1080">1080p</option>
              <option value="720">720p</option>
              <option value="480">480p</option>
            </select>
            <select name="format">
              <option value="mp4">mp4</option>
              <option value="m4a">m4a</option>
            </select>
          </div>
          <div>
            <button type="submit">Download</button>
          </div>
        </form>
        <button onClick={getFilesInDir}>List Files</button>
        <p>Files array is {files.length ? 'not empty' : 'empty'}</p>
        <ul>
          {files.map(fileName => { return <li key={fileName}>{fileName}</li> })}
        </ul>
      </div>
    </>
  )
}

export default App
