import express from 'express';
import request from 'request';
import musicUtils from './musicUtils';
import urls from './urls'
import fs from 'fs'
const router = express.Router()
router.get(
   '/artist',
   function (req: express.Request, res: express.Response) {
      if (req.query) {
         if (req.query.name && req.query.name.length < 50) {
            let author = musicUtils.cleanWhiteSpace(req.query.name)
            let uri = urls.itunes.musicArtist(author)
            console.log(uri, author)
            let data = ""
            request({
               url: uri,
               gzip: true,
               method: "GET",
               encoding: "utf-8"
            },
               function (err, apiRes, body) {
                  if (apiRes.statusCode !== 200) {
                     res.send(apiRes.statusCode).send(body)
                  }
               }).on('data', (chunk) => {
                  data += chunk
               }).on("end", function () { 
                  res.status(200).send(data)
               }).on('error', (code)=>{
                     res.status(400).send(code)
               })


         } else {
            res.status(400).send({ msg: "Author name not valid" })
         }
      } else {
         res.status(400).send({ msg: "Author name not valid" })
      }
   })

router.get(
   '/track',
   function (req: express.Request, res: express.Response) {
      if (req.query) {
            console.log('track')
         if (req.query.name && req.query.name.length < 50) {
            let track = musicUtils.cleanWhiteSpace(req.query.name)
            let uri = urls.itunes.musicTrack(track)
            let data = ""
            request({
               url: uri,
               gzip: true,
               method: "GET",
               encoding: "utf-8"
            },
               function (err, apiRes, body) {
                  if (apiRes.statusCode !== 200 || err) {
                     if (err) res.send(apiRes.statusCode).send(err)
                     res.send(apiRes.statusCode).send(body)
                  }
               }).on('data', (chunk) => {
                  data += chunk
               }).on("end", function () {
                  res.status(200).send(data)
               })
         } else {
            res.status(400).send({ msg: "Track name not valid" })
         }
      } else {
         res.status(400).send({ msg: "Track name not valid" })
      }
   })

export { router as musicRouter }