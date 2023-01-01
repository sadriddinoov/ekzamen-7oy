import joi from "joi";

const loginShema = joi.object({
    username: joi.string().min(2).required(),
    password: joi.string().min(8).required()
})

const eventsShema = joi.object({
    data: joi.date().required(),
    time: joi.string().valid("1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00").required(),
    category: joi.string().valid("IT", "Dizayn", "Biznes", "T'alim").required(),
    subcategory: joi.string().valid("Web dasturlash", "Mobile dasturlash", "UI/UX dizayn", "Grafik dizayn", "Menejment", "Kredit va audit", "Fizika", "Matematika").required(),
    online_or_ofline: joi.string().valid('online', 'offline').required(),
    link: joi.string().required(),
    owner_name: joi.string().min(3).required(),
    profesion: joi.string().required(),
    phone: joi.string().required(),
    description: joi.string().required(),
    body: joi.string().required(),
})



export  {
    loginShema,
    eventsShema
}