const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '..', 'Logs', 'log.json');


const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Capture the original res.send function
  const originalSend = res.send;

  // Override res.send to capture the response body and log
  res.send = function (body) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      requestHeaders: req.headers,
      requestBody: req.body, // Make sure you use body-parser middleware if needed
      statusCode: res.statusCode,
      responseHeaders: res.getHeaders(),
      responseBody: body,
      responseTime: responseTime,
    };

    try {
      let logs = [];
      //check if file exist
      if (fs.existsSync(logFilePath)) {
         const fileContent = fs.readFileSync(logFilePath, 'utf-8');
         if(fileContent){
            logs = JSON.parse(fileContent);
         }
      }
      

      logs.push(logEntry);

      fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
      console.log('Request logged successfully!');

    } catch (error) {
      console.error('Error writing to log file:', error);
    }

    // Call the original res.send function
    return originalSend.call(this, body);
  };

  next();
};

module.exports = requestLogger;