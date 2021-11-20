"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    const client = await clientPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);

    const audiolibros = 
	  await client.db("proyecto").collection("audiolibros").find({_id:id}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(audiolibros)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};