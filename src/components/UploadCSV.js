import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

// Add a new prop called `onRatingsProcessed`
const UploadCSV = ({ setMovies, onRatingsProcessed }) => {
    const beforeUpload = (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      axios
        .post('/api/upload_csv', formData)
        .then((response) => {
          onRatingsProcessed(response.data.movies);
          message.success('CSV file processed successfully');
        })
        .catch((error) => {
          message.error('Error processing the CSV file');
        });
  
      return false;
    };
  
    return (
      <Upload beforeUpload={beforeUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload CSV</Button>
      </Upload>
    );
  };
  
  export default UploadCSV;
