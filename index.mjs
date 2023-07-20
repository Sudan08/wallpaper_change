// const https = require('https');
// const fs = require('fs');
// const {readdir}  = require('fs/promises');
// const path = require('path');
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import {readdir} from 'fs/promises';
import path from 'path';

import {setWallpaper} from 'wallpaper';


let imageUrl;
let imageName;


const checkAndDelete = async () => {
    const files = await readdir('C:/Projects/wallpaper_change');
    const file = files.filter((file) => {
        const fileExt = path.extname(file);
        return fileExt === `.jpg` || fileExt === `.png` ? file : null
    })
    console.log(file);
    if (file.length > 0) {
    fs.unlink(file[0],(err)=>{
        if(err){
            console.log(err)
        }
        console.log('deleted');
        return null;
    });
    }
    else {
        console.log('No image found');
        return null;
    }
}


const  saveImage = async () =>{
 await fetch('https://www.reddit.com/r/wallpaper/top/.json?limit=1')
  .then(function(res) {
    return res.json(); 
  })
  .then(function(JSONdata) {
    try{
    imageUrl = JSONdata.data.children[0].data.url;
    var imageArr = imageUrl.split('/'); 
    imageName = imageArr[imageArr.length - 1];
    }  
    catch (err){
        console.log(err);
    } 
  })
  .catch(function(err) {
    console.log(err);   
  });

  // const file = fs.createWriteStream(imageName);

  // await https.get(imageUrl , res => {
  //   res.pipe(file);

  //   file.on('finish' , () =>{
  //       file.close();
  //       console.log(`Image downloaded as ${imageName}`);
  //       return true;
  //   });
  // }).on('error' , err =>{
  //   fs.unlink(imageName);
  //   console.error(`Error downloading image: ${err.message}`);
  // }) 

  await fetch(imageUrl)
   .then((res) => res.buffer())
   .then((buffer) => {
    fs.writeFile(path.join('C:/Projects/wallpaper_change',imageName) , buffer , (err) => {
      if (err){
        console.log(err);
      }
      else {
        console.log('Image downloaded');
      }
    })
   }) 


}


const main = async () =>{
 await checkAndDelete();
 await saveImage();
 await setWallpaper(`C:/Projects/wallpaper_change/${imageName}`);
 }

main();

