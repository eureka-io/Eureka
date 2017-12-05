const axios = require("axios");
const Video = require('../db').Video;
const addToDB = require('./addToDB');
const ytKey = "AIzaSyDZxJwtWfdNWheLpKk-lrLbXLHaiWZfp2s";
const vimKey = "53dea8ea88fb59d8aab79d5083257416";
const dmKey = "";

//Check videoUrl for hosting provider
module.exports = addVideo = (req, res) => {
  let info = {
    submittedBy: req.body.params.email,
    category: req.body.params.category,
    subCategory: req.body.params.category + " \'s subcategory",
    res: res
  };
  // flag for security uses
  let flag = 0;
  if(flag == 0 && req.body.params.url.indexOf('youtube.com') >= 0){
    let uniqueId = req.body.params.url;
    uniqueId = uniqueId.split('youtube.com/watch?v=')[1];
    verifyVideo(uniqueId, 'YouTube', info);
    flag = 1;
  }else if(flag == 0 && req.body.params.url.indexOf('dailymotion.com') >= 0){
    let uniqueId = req.body.params.url;
    uniqueId = uniqueId.split('dailymotion.com/video/')[1];
    verifyVideo(uniqueId, 'DailyMotion', info);
    flag = 1;
  } else if(flag == 0 && req.body.params.url.indexOf('vimeo.com') >= 0) {
    let uniqueId = req.body.params.url;
    uniqueId = uniqueId.split('vimeo.com/')[1];
    verifyVideo(uniqueId, 'Vimeo', info);
    flag = 1;
  } else {
    info.res.status(200).send("Link not from valid provider");
  }
};


function verifyVideo(id, provider, info){
  if (provider == 'YouTube'){
    function convert_time(duration) {
      let a = duration.match(/\d+/g);
      if ((a[0] == 5 && a[1] > 0) || duration.indexOf('H') >= 0 || a[0] > 5) {
        return false;
      }
      return true;
    }
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,status&id="
      + id +"&fields=items(snippet/title, snippet/channelTitle, snippet/description, contentDetails/duration,status/embeddable)&key=" + ytKey;
    axios
      .get(url)
      .then(response => {
        if (convert_time(response.data.items[0].contentDetails.duration) === true) {
          let saveVideo = new Video({
            title: response.data.items[0].snippet.title,
            url: 'https://www.youtube.com/watch?v=' + id,
            description: response.data.items[0].snippet.description,
            createdBy: response.data.items[0].snippet.channelTitle,
            submittedBy: info.submittedBy,
            dateAdded: new Date().toJSON().slice(0,10),
            linkType: provider,
            category: info.category,
            subcategory: info.subCategory
          });
          console.log(saveVideo);
          saveVideo.save((err) => console.log(err));
          info.res.status(200).send("Valid video and saved");
        } else {
          info.res.status(200).send("Duration too long");
        }

      })
      .catch(error => {
        console.log(error);
      });
  } else if (provider === 'DailyMotion') {

    const url =
      "https://api.dailymotion.com/video/"+ id + "?fields=owner,title,duration,allow_embed,description";

    axios
      .get(url)
      .then(response => {
        if (response.data.duration <= 300){
          console.log(response.data);
          let saveVideo = new Video({
            title: response.data.title,
            url: 'https://dailymotion.com/video/' + id,
            description: response.data.description,
            createdBy: response.data.owner,
            submittedBy: info.submittedBy,
            dateAdded: new Date().toJSON().slice(0,10),
            linkType: provider,
            category: info.category,
            subcategory: info.subCategory
          });
          console.log(saveVideo);
          saveVideo.save((err) => console.log(err));
          info.res.status(200).send("Valid video and saved");
        } else {
          info.res.status(200).send("Duration too long");
        }
      })
      .catch(error => {
        console.log(error);
      });

  } else if (provider === 'Vimeo') {

    const url =
      "https://api.vimeo.com/videos/" + id + "?access_token=" + vimKey + "&fields=name,duration,embed,privacy,user,description";
    axios
      .get(url)
      .then(response => {
          console.log(response.data);
        if (response.data.duration <= 300) {
          let saveVideo = new Video({
            title: response.data.name,
            url: 'https://vimeo.com/' + id,
            description: response.data.description,
            createdBy: response.data.user.name,
            submittedBy: info.submittedBy,
            dateAdded: new Date().toJSON().slice(0,10),
            linkType: provider,
            category: info.category,
            subcategory: info.subCategory
          });
          console.log(saveVideo);
          saveVideo.save((err) => console.log(err));
          info.res.status(200).send("Valid video and saved");
        } else {
          info.res.status(200).send("Duration too long");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
