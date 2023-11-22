import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import PatternForm, {useFormData} from './PatternForm';
import Pattern from './Pattern';
import Error from './Error';

function App() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <PatternForm/>
      },
      {
        path: 'pattern/new',
        method: 'post',
        action: useFormData,
        element: <Pattern/>
      },
      {
        path:'error',
        element: <Error/>
      }
  ]);
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;