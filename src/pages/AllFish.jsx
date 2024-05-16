

import  { useState, useEffect } from 'react';
import { S3Client, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import FishDisplay from '../components/FishDisplay';
import './AllFish.css';

const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "nyc3",
    credentials: {
        accessKeyId: 'DO00M4C366LLVVWCQ9TZ', // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: '4Zm39sL7mB9DSIgvZuU1bPu7mEqOitMiod79b98SnfE', // Secret access key defined through an environment variable.
      }
});

function AddFish() {
  const [fishData, setFishData] = useState([]);

  useEffect(() => {
    const getFishData = async () => {
      try {
        const listParams = {
          Bucket: 'cross-fishing',
          Prefix: 'fish/'
        };
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const files = data.Contents;
        const jsonFiles = files.filter(file => file.Key.endsWith('.json'));
        const promises = jsonFiles.map(async (file) => {
          const getParams = {
            Bucket: 'cross-fishing',
            Key: file.Key
          };
          const fileData = await s3Client.send(new GetObjectCommand(getParams));
          const fileContent = await fileData.Body.getReader().read();
          return JSON.parse(new TextDecoder().decode(fileContent.value));
        });
        const jsonData = await Promise.all(promises);
        setFishData(jsonData);
      } catch (err) {
        console.error("Error fetching fish data:", err);
      }
    };
    getFishData();
  }, []);



  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {fishData.map((fish, index) => (
            <FishDisplay key={index} fishObject={fish}/>
        ))}  
    </div>
  );
}

export default AddFish;
