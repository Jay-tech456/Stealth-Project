import './App.css';
import Navigation from './navigation/navigation';
import AppRoute from './navigation/appRoute';
import { BrowserRouter } from 'react-router-dom';
import Footer from './views/footer';

function App() {
  return (
    <div className="outer-container">
      <div className="inner-container">
        <BrowserRouter>
          <Navigation />
          <div className="content-container">
            <AppRoute />
          </div>
        </BrowserRouter>
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default App;





// import './App.css';
// import Navigation from './navigation/navigation';
// import AppRoute from './navigation/appRoute';
// import { BrowserRouter } from 'react-router-dom';
// import Footer from './views/footer';

// function App() {
//   return (
//     <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
//       <div style={{ width: '95%', maxWidth: '1600px', flexDirection: 'column', display: 'flex' }}>
//         <div>
//           <BrowserRouter>
//             <Navigation />
//             <AppRoute />
//           </BrowserRouter>
//         </div>
//         <div style={{position: 'absolute', bottom: 0}}>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


