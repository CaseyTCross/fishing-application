import {  useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import LakesDropDown from "../components/LakesDropDown";
import FishTypesDropDown from "../components/FishTypesDropDown";
import lakes from "../assets/Lakes";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import FishermenDropDown from "../components/FishermenDropDown";
import heic2any from "heic2any";
import './AddFish.css';

const convertHeicToJpeg = async  (heicFile) => {
  try {
    const jpegBlob = await heic2any({
      blob: heicFile,
      toType: "image/jpeg"
    });
    return jpegBlob;
  } catch (error) {
    console.error('Conversion error:', error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};



const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "nyc3",
    credentials: {
        accessKeyId: 'DO00M4C366LLVVWCQ9TZ', // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: '4Zm39sL7mB9DSIgvZuU1bPu7mEqOitMiod79b98SnfE', // Secret access key defined through an environment variable.
      }
});


const isHEICFILE = async (file) => {
  if (file.name.endsWith('.heic') || file.name.endsWith('.heif')) {
    try {
      file = await convertHeicToJpeg(file);
      console.log(file);
      file.name = uuidv4() + ".jpg";
      return file;
    } catch (error) {
      console.error('Conversion error:', error);
      // Handle conversion error
    }
  } else {
    return file;
  }
};

const uploadObject = async (params) => {
  try {
    params.ACL = 'public-read';
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};







function AddFish() {


  let isWeather = false;

    const [lake, setLake] = useState('');
    const [fishType, setFishType] = useState('');
    const [fishermen, setFishermen] = useState('');
    let weatherData = [];

    const fullFishData = {
        mainPhotoUrl: undefined,
        secondaryPhotoUrls: [],
        fishType: undefined,
        length: undefined,
        weight: undefined,
        lakeName: undefined,
        lureType: undefined,
        lureColor: undefined,
        notes: undefined,
        timestamp: undefined,
        currentWeatherIconName: undefined,
        currentWeatherIconNum: undefined,
        currentTemp: undefined,
        currentWindSpeed: undefined,
        currentWindDirection: undefined,
        dayWeatherIconName: undefined,
        dayWeatherIconNum: undefined,
        dayWeatherSummary: undefined,
        dayWeatherTempMin: undefined,
        dayWeatherTempMax: undefined,
        dayWeatherWindSpeed: undefined,
        dayWeatherWindDirection: undefined,
        dayWeatherCloudCover: undefined,
        lat: undefined,
        lon: undefined,
        PhotoTimestamp: undefined,
        latImage: undefined,
        lonImage: undefined,
        uploadDate: undefined,
        fisherman: undefined,

    }

    function handleLakeDropDown(event) {
        setLake(lakes[event.target.value]); 
    }
    function handleFishTypeDropDown(event) {
        setFishType(event.target.value);
    }
    function handleFishermenDropDown(event) {
        setFishermen(event.target.value);
    }
    //Upload portion

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Processing Form");
    const formData = new FormData(event.target);

    //start the fetch process for weather data
    console.log("TESTER-----------------" + lake.lat + lake.lon + formData.get("logWeatherData"));
    if(formData.get("logWeatherData") === "on" && lake != null )  {
      console.log("ENTERED THE IF")
      await fetchWeatherData(lake.lat,lake.lon);
      console.log("AFTER THE IF");
  }


    let mainPhoto = formData.get('main-photo');
    console.log("Test Main Photo: " + mainPhoto);
    //convert heic image if needed.
    mainPhoto = await isHEICFILE(mainPhoto);

    console.log("MAIN PHOTO AFTER ISHEICFILE : " + mainPhoto);

    let secondaryPhotos = formData.getAll('secondary-photos');
    const convertedPhotos = await Promise.all(secondaryPhotos.map(async (file) => {
      if (file.name.endsWith('.heic') || file.name.endsWith('.heif')) {
          try {
              return await convertHeicToJpeg(file);
          } catch (error) {
              console.error('Conversion error:', error);
              // Handle conversion error
          }
      }
      return file; // Return original file if it's not HEIC
    }));
  console.log(convertedPhotos);
  await Promise.all(convertedPhotos.map(async (picture, index) => {
    if (picture instanceof Blob) {
      console.log("Test: " + picture);
      convertedPhotos[index] = await new File([picture], uuidv4(), { type: picture.type });
      console.log("Test after: " + convertedPhotos[index]);
    }
  }));
  console.log(convertedPhotos);
  secondaryPhotos = convertedPhotos;
    
    

    //Add weather data to fullFishData
    fullFishData.currentWeatherIconName = weatherData?.current?.icon;
    fullFishData.currentWeatherIconNum = weatherData?.current?.icon_num;
    fullFishData.currentTemp = weatherData?.current?.temperature;
    fullFishData.currentWindSpeed = weatherData?.current?.wind?.speed;
    fullFishData.currentWindDirection = weatherData?.current?.wind?.dir;

    fullFishData.dayWeatherIconName = weatherData?.daily?.weather;
    fullFishData.dayWeatherIconNum = weatherData?.daily?.icon;
    fullFishData.dayWeatherSummary = weatherData?.daily?.summary;
    fullFishData.dayWeatherTempMin = weatherData?.daily?.all_day?.temperature_min;
    fullFishData.dayWeatherTempMax = weatherData?.daily?.all_day?.temperature_max;
    fullFishData.dayWeatherWindSpeed = weatherData?.daily?.all_day?.wind?.speed;
    fullFishData.dayWeatherWindDirection = weatherData?.daily?.all_day?.wind?.dir;
    fullFishData.dayWeatherCloudCover = weatherData?.daily?.all_day?.cloud_cover?.total;

    //Add all non fetchables to the fullfishdata
    fullFishData.timestamp = Date.now();
    fullFishData.lakeName = lake.name;
    fullFishData.lat = lake.lat;
    fullFishData.lon = lake.lon;
    fullFishData.fishType = fishType;
    fullFishData.length = formData.get("length");
    fullFishData.weight = formData.get("weight");
    fullFishData.lureColor = formData.get("lureColor");
    fullFishData.lureType = formData.get("lureType");
    fullFishData.notes = formData.get("notes");
    fullFishData.fisherman = fishermen;
    fullFishData.uploadDate = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '-');
    
    console.log(fullFishData);
    const fishPrefix = fullFishData.uploadDate + "_" + fullFishData.fishType + "_" + fullFishData.lakeName + "_" + fullFishData.timestamp;
    console.log(fishPrefix);
    console.log("THIS IS IT" + mainPhoto);

    const s3BaseURL = "https://cross-fishing.nyc3.cdn.digitaloceanspaces.com/";

    //performing image uploads to s3 bucket

    let params = {
      Bucket: 'cross-fishing',
      Key: "fish/" + fishPrefix + "/images/main/" + mainPhoto.name ,
      Body: mainPhoto ,
      ContentType: 'image/jpeg'
    };
    uploadObject(params);
    fullFishData.mainPhotoUrl = s3BaseURL + params.Key;     //refreshes are currently uploading new image everytime.


    await Promise.all(secondaryPhotos.map(async (picture, index) => {
      params = {
        Bucket: 'cross-fishing',
        Key: "fish/" + fishPrefix + "/images/secondary/" + picture.name ,
        Body: picture ,
        ContentType: 'image/jpeg'
      };
      uploadObject(params);
      fullFishData.secondaryPhotoUrls[index] = s3BaseURL + params.Key;

    }));

    console.log("end photos");
    console.log(fullFishData);

      //end upload portion
    
    console.log(mainPhoto);
    const imageUrl = URL.createObjectURL(mainPhoto);
    console.log({imageUrl});

    

    console.log(fullFishData);


    const fullFishDataStringify = JSON.stringify(fullFishData);

    params = {
      Bucket: 'cross-fishing',
      Key: "fish/" + fishPrefix + "/json/" + "fishData.json" ,
      Body: fullFishDataStringify ,
      ContentType: 'application/json'
    };
    uploadObject(params);
    
  }


  const fetchWeatherData = async (lat, lon) => {
    const weatherUrl = `https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${lon}&sections=current,daily&timezone=America/Chicago&language=en&units=us&key=z773bqrovgp7z7ae57e5y86p0yr6qce49tj68gp2`;
    await fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        weatherData =({current: data.current, daily: data.daily.data[0]});
        isWeather = true;
        console.log("WEATHER DATA LOG::::::::: " + weatherData.current);

      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <>
      <Form id="submitForm" className="main-form" onSubmit={handleSubmit}>
        <br />
        <div className="images-forms">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Main Fish Photo</Form.Label>
          <br />
          <Form.Control name="main-photo" type="file" style={{  }}  />
        </Form.Group>
        
        <Form.Group name="secondary-photos" controlId="formFileMultiple" className="mb-3">
          <Form.Label>Extra Optional Photos</Form.Label>
          <br />
          <Form.Control name="secondary-photos" type="file" multiple />
        </Form.Group>
        
        </div>
        
        <div className="dropdowns">
        <Form.Label>Lake Name</Form.Label>
        <LakesDropDown className="dropdown-component" name="lake" onChange={handleLakeDropDown}  />
        <br />
        <Form.Label>Fish Type</Form.Label>
        <FishTypesDropDown className="dropdown-component" name="fishType" onChange={handleFishTypeDropDown} />
        <br />
        <Form.Label>Angler</Form.Label>
        <FishermenDropDown className="dropdown-component" name="fishermen" onChange={handleFishermenDropDown} />
        <br />
        </div>
        <div className="fish-details">
        <Form.Label>Lure / Bait Type</Form.Label>
        <br />
        <Form.Control name="lureType" type="text" placeholder="ex: Spinner, Minnow" />
        <br />
        <Form.Label>Lure Color Primary/Secondary</Form.Label>
        <br />
        <Form.Control name="lureColor" type="text" placeholder="ex: Yellow/Red" />
        <br />
        <Form.Label>Length (inches)</Form.Label>
        <br />
        <Form.Control name="length" type="text" placeholder="ex: 14.5" />
        <br />
        <Form.Label>Weight (pounds)</Form.Label>
        <br />
        <Form.Control name="weight" type="text" placeholder="ex: 4.2" />
        <br />
        <Form.Label>Notes / Info</Form.Label>
        <br />
        <Form.Control name="notes" as="textarea" rows={3} />
        <br />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="formcheckbox" style={{ textAlign: "center" }}>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Collect Weather Data?"
          name="logWeatherData"
        />
        </div>
        </div>
        <Form.Label>
          *Only Check this if you caught the fish today
        </Form.Label>
        <br />
        <Form.Label>
          *If you didnt catch within a couple hours leave <br/> note that current weather might be inaccurate
        </Form.Label>
        <br />
        <Button style={{color: '#000000' }} className="submit-button" variant="primary" type="submit">
          Submit Fish
        </Button>
        <br/>
        <br/>
      </Form>
      
    </>
  );
}

export default AddFish;



