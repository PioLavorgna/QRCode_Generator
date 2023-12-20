/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

const QRCodeGenerator = () => {
  const defaultLink = 'https://www.linkedin.com/in/piolavorgna/'
  const [link, setLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [size, setSize] = useState({ width: 200, height: 200 });
  const qrCodeRef = useRef(null);

  useEffect(() => {
    generateQRCode()
  }, [link, size]);

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value.split('x').map(Number);
    setSize({ width: selectedSize[0], height: selectedSize[1] });
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current, { width: size.width, height: size.height }).then((canvas) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size.width;
        tempCanvas.height = size.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0, size.width, size.height);

        const link = document.createElement('a');
        link.download = `${fileName.length > 0 ? fileName : 'QR CODE'}.png`;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const generateQRCode = () => {
    QRCode.toCanvas(qrCodeRef.current, (link.length > 0 ? link : defaultLink), { width: size.width, height: size.height }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  const sizeOptions = [
    '50x50',
    '100x100',
    '150x150',
    '200x200',
    '250x250',
    '300x300',
    '350x350',
    '400x400',
    '450x450',
    '500x500',
  ];

  return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-lime-950/80">
          <label htmlFor="giveName" className="font-bold block mb-2 text-sm text-white dark:text-white">
          Give a name to your QR Code
          </label>
          <input
            id='giveName'
            type="text"
            placeholder="File name"
            value={fileName}
            onChange={handleFileNameChange}
            className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <br />
          <label htmlFor="insertLink" className="font-bold block mb-2 text-sm text-white dark:text-white">
          Copy the link into this box to generate a new QR Code
          </label>
          <input
            id='insertLink'
            type="text"
            placeholder="Copy link"
            value={link}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <br />
          <label htmlFor="sizeSelect" className="font-bold block mb-2 text-sm text-white dark:text-white">Select size</label>
          <select 
            id="sizeSelect" 
            className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSizeChange} 
            value={`${size.width}x${size.height}`}
            >
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-center mt-2 overflow-auto rounded-lg">
            <canvas
              ref={qrCodeRef}
              width={size.width}
              height={size.height}
              className="bg-gray-200 rounded-lg"
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleDownload}
              className="bg-indigo-950 font-bold hover:bg-cyan-600 mt-2 px-4 py-2
              text-white rounded-md focus:outline-none focus:ring focus:border-blue-300
              inline-flex items-center justify-center ransition-transform duration-300 transform hover:scale-110"
            >
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
              <span>Download QR Code</span>
            </button>
          </div>
          
        </div>
    </div>
  );
};

export default QRCodeGenerator;
