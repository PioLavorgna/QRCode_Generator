import NavBar from './Navbar'
import QRCodeGenerator from './QRCode'

function App() {
  return (
    <>
    <div 
      className="bg-[url('/src/assets/background.jpg')] bg-cover bg-center bg-no-repeat rounded-lg shadow-md flex flex-col items-center justify-center  min-h-screen ">
        <NavBar/>
        <div className='w-full mb-2 py-1'>
          <QRCodeGenerator />
        </div>
        <div></div>
      </div>  
    </>
  )
}

export default App

/* 
style={{
          backgroundImage: `url(${imageURL})`,
        }}>
*/