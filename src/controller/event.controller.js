import { read, write } from "../utils/model.js";
import path from 'path'

let POST = (req, res) => {
  try {
    let events = read('events');
    let { data, time, category, subcategory, online_or_ofline, link, owner_name, profesion, phone, description, body } = req.body;
    let { img } = req.files;



    let fileName = Date.now + img.name.replace(/\s/g, '')
    img.mv( path.resolve( "uploads", fileName) )

    let newEvent = {
        event_Id: events.at(-1)?.event_Id + 1 || 1,
        data, time, category, subcategory, online_or_ofline, link, owner_name, profesion, phone, description, img: img.name, body, status: false, views: 0
    }

    events.push(newEvent)
    write("events", events)

    res.status(201).json({status: 201, message: "ok", data: newEvent})
  } catch (error) {
    res.status(400).json({status: 400, message: error.message})
  }
}

let QUEYRY = (req, res) => {
  let { data, online_or_ofline, owner_name, subcategory } = req.query;
  let events = read("events")

  let filteredUser = {};
  
    if (data && online_or_ofline && owner_name && subcategory) {
      filteredUser = events.filter(event => data.toString.toUpperCase == event.data.toString.toUpperCase && online_or_ofline.toString.toUpperCase() == event.online_or_ofline.toString.toUpperCase() && owner_name.toString.toUpperCase == event.owner_name.toString.toUpperCase && subcategory.toString.toUpperCase == event.subcategory.toString.toUpperCase)
    }

    if (data) {
      filteredUser = events.filter(event => event.data.toString.toUpperCase == data.toString.toUpperCase)
    }

    if (online_or_ofline) {
      filteredUser = events.filter(event => event.online_or_ofline.toString.toUpperCase == online_or_ofline.toString.toUpperCase )
    }

    if (owner_name) {
      filteredUser = events.filter(event => event.owner_name.toString.toUpperCase == owner_name.toString.toUpperCase )
    }

    if (subcategory) {
      filteredUser = events.filter(event => event.subcategory.toString.toUpperCase == subcategory.toString.toUpperCase )
    }

    if (filteredUser.length) {
      res.status(200).json({status: 200, message: "ok", data: filteredUser})
    }else {
      res.status(400).json({status: 400, message: "this event is not"})
    }
  }


export default {
    POST,
    QUEYRY
}