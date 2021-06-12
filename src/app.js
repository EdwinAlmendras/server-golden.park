import express from "express";
import { MegaClient } from "@gxldxm/mega-api";
import { exec } from "child_process"
import axios from "axios"
const app = express();
const port = 4000

async function main() {

  const client = new MegaClient()
  await client.account.login({
    email: "goldenpark1@yopmail.com",
    password: "goldenpark1@yopmail.com",
    fetch: true
  })

  console.log("Sucesssfully logged in ", client.state.USER_ID)


  app.get('/f/:id', async (req, res) => {
    console.log("Something is Getting")
    const nodeId = req.params.id
    const stream = await client.files.geData({
      nodeId,
      responseType: "stream"
    })
    stream.pipe(res)
  })

  app.get("/w/:id", async (req, res) => {
    console.log("soething is starting to wahtcgh")
  const path = "C:\\Program Files\\VideoLAN\\VLC/vlc.exe"

    const nodeId = req.params.id
    let file = client.files.get({
      nodeId
    })
    exec(`"${path}" http://localhost:4000/f/${nodeId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
    
      console.log(`stdout:\n${stdout}`);
    });
    res.send("OK")
  })
  app.listen(port, () => {
    console.log(`GOLDENPARK listening at port http://localhost:${port}`)
  })
}



main()
