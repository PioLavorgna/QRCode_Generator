function NavBar() {
    const openNewTab = (url)=> {
        window.open(url, '_blank');
    }

    return ( 
        <div className='flex flex-col w-full max-w-md rounded-lg'>
            <img src='/src/assets/LogoQrCode.png' className='rounded-lg mb-1 max-w-md'/>
            <div id='iconProfile' className='flex justify-end bg-lime-700/60 rounded-lg p-1'>
                <img
                    onClick={()=>openNewTab('https://www.linkedin.com/in/piolavorgna/')}
                    src='/src/assets/icons8-linkedin-48.png' 
                    alt='icon' 
                    className="w-10 ransition-transform duration-300 transform hover:scale-110"/>
                <img 
                    onClick={()=>openNewTab('https://github.com/PioLavorgna')}
                    src='/src/assets/icons8-github-50.png' 
                    alt='icon' 
                    className="w-10 bg-yellow-500 rounded-full ransition-transform duration-300 transform hover:scale-110"/>
            </div>
        </div>
    );
}

export default NavBar;
