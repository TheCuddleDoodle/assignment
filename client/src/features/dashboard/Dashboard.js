import React,{useState, useEffect}  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'features/auth/authSlice';
import FileUploadScreen from './screens/FileUploadScreen';
import {getSingleFiles} from './data/api';


const Dashboard = () => {
  // Get user from state
  const [singleFiles, setSingleFiles] = useState('');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  useEffect(() => {
    getSingleFileslist();
  }, []);
  return (

    <div style={{ height: '75vh' }}>

      <div className='row'>
        <div className='landing-copy col s12 center-align'>
          <h4>
            <b>Hey there,</b> {user.name.split(' ')[0]}
            <p className='flow-text grey-text text-darken-1'>
              Upload your files here, right click and save as for direct link {' '}
              <span style={{ fontFamily: 'monospace' }}></span> 👏📁
            </p>

            <div className="col-6">
             <h4 className="text-success font-weight-bold"> Files List</h4>
             <div className="row">
                {singleFiles.map((file, index) =>
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img src={`http://localhost:5000/api/users/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                      </div>
                  </div>
                )}
             </div>
           </div>
           <FileUploadScreen getsingle={() => getSingleFileslist()}/>
          </h4>
          <button
            style={{
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px',
              marginTop: '1rem'
            }}
            onClick={onLogoutClick}
            className='btn btn-large waves-effect waves-light hoverable blue accent-3'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
