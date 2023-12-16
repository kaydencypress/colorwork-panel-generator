import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PatternForm, {useFormData} from './PatternForm';
import PatternPreview from './PatternPreview';
import './App.css'

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
        element: <PatternPreview/>
      }
  ]);
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;