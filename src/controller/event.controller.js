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
        data, time, category, subcategory, online_or_ofline, link, owner_name, profesion, phone, description, img: img.name, body, status: false
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

  let filteredUser;
  
    if (data && online_or_ofline && owner_name && subcategory) {
      filteredUser = events.filter(event => data.toString() == event.data.toString() && online_or_ofline.toString() == event.online_or_ofline.toString() && owner_name.toString() == event.owner_name.toString() && subcategory.toString() == event.subcategory.toString())
    }

    if (data) {
      filteredUser = events.filter(event => event.data == data)
    }

    if (online_or_ofline) {
      filteredUser = events.filter(event =>event.online_or_ofline.toString() == online_or_ofline.toString()) ;
    }

    if (owner_name) {
      filteredUser = events.filter(event => event.owner_name.toString() == owner_name.toString() )
    }

    if (subcategory) {
      filteredUser = events.filter(event => event.subcategory.toString() == subcategory.toString() )
    }

    if (filteredUser) {
      res.status(200).json({status: 200, message: "ok", data: filteredUser})
    }else {
      res.status(400).json({status: 400, message: "this event is undefined"})
    }
  }


  let GET = (req, res) => {
    let events = read("events")

    let { page = process.DEFAULT.pagination.page, limit = process.DEFAULT.pagination.limit } = req.query;

    let result = events.filter(event => event.status == true)
    .slice((page - 1) * limit, page * limit);

    res.status(200).json({status: 200, message: "ok", data: result})
  }

  let PARAMS = (req, res) => {
   try {
    let events = read("events");
    let { id } = req.params;

    if (!id) {
      throw new Error("id is requireв")
    }

    let result = events.filter(event => event.status == true);
    let param = result.filter(event => event.event_Id.toString() == id.toString());

    if (!param.length) {
      throw new Error("that event is undefined or this events status false")
    }

    res.status(200).json({status: 200, message: "ok", event: param})
   } catch (error) {
    res.status(400).json({status: 400, message: error.message})
   }
  }

export default {
    POST,
    QUEYRY,
    GET,
    PARAMS
}