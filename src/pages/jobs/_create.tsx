import Box from '@mui/material/Box'
import Layout from '../../layout/common'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MDEditor from '@uiw/react-md-editor';
import {  useState } from 'react'
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useFirestore, useAuth, useFirestoreDocData } from 'reactfire'
import { doc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress'

export default function CreateJob() {
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const firestore = useFirestore();
  const navigate = useNavigate();
  const [aboutJob, setAboutJob] = useState("**About the job**\n");
  const [companyName, setCompany] = useState();
  const [editableData, setEditableData] = useState();
  const queryId = searchParams.get('id');

  // to get job data if id is present in query
  const jobRef =  doc(firestore, `jobs/${queryId}`);
  const { status: jobStatus, data: jobData } = useFirestoreDocData(jobRef);

  if(jobData) {
    if(jobStatus !== 'loading' && typeof editableData === 'undefined') {
      setEditableData(jobData);
      setAboutJob(jobData?.about);
      setCompany(jobData?.companyId)
    }
  }

  // to get company name from current user
  const userDocRef = doc(firestore, `users/${auth?.currentUser?.email}`);
  const { status, data: user } = useFirestoreDocData(userDocRef);
  // ----

  if(status !== 'loading' && typeof companyName === 'undefined') {
    setCompany(user?.company?.id || '')
  }

  async function addJobInCompany(jobId) {
    const companyRef = doc(firestore, `companies/${companyName}`);
    await updateDoc(companyRef, {
        jobs: arrayUnion(jobId)
    });
  }

  const saveJob = (data, callback) => {
    const jobsCollection = collection(firestore, 'jobs');
    addDoc(jobsCollection, data).then(async (job) => {
      await addJobInCompany(job.id)
      callback(job.id);
    }).catch(e => console.log(e));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.currentTarget;

    const obj = {
      title: data.title.value,
      type: data.type.value,
      location: data.location.value,
      about: aboutJob,
      companyId: user?.company?.id || ''
    }

    saveJob(obj, (id) => navigate({
        pathname: "/jobs",
        search: createSearchParams({
            id
        }).toString()
      })
    );
  
  } 

  const updateJob = () => {
    const jobObj = {
      ...editableData,
      about: aboutJob
    }
    updateDoc(jobRef, jobObj).then(() => {
      navigate({
        pathname: "/jobs",
        search: createSearchParams({
            id: queryId
        }).toString()
      })
    });
  }

  if(jobStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Layout>
      <Typography component="h1" variant="h5" sx={{mt: 6}}>
        Create a job
      </Typography>
      <Box
        maxWidth="md"
        component="form"
        noValidate={false}
        onSubmit={handleSubmit}
        sx={{ mt: 5 }}
        >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="job-title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Job title"
                  value={editableData?.title}
                  onInput={(e) => setEditableData({...editableData , title:e?.target.value})}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="company"
                  label="Company name"
                  name="company"
                  autoComplete="company-name"
                  value={companyName || ''}
                  onChange={e => e.target.disabled = true}
                  // onInput={(e) => setCompany(e?.target?.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  label="Job type"
                  name="type"
                  autoComplete="job-type"
                  value={editableData?.type}
                  onInput={(e) => setEditableData({...editableData , type:e?.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value={editableData?.location}
                  onInput={(e) => setEditableData({...editableData , location:e?.target.value})}
                />
              </Grid>
              <Grid item xs={12} >
                <div data-color-mode="light">
                  <MDEditor
                    value={aboutJob}
                    onChange={setAboutJob}
                    name="about"
                    id="about"
                    style={{
                      height: '50%',
                      minHeight: 300
                    }}
                  />
                </div>
                {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => navigate({
                    pathname: "/jobs",
                    search: createSearchParams({
                        id: queryId
                    }).toString()
                  })}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                  {
                    queryId ? 
                      <Button
                        onClick={updateJob}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update Job
                      </Button>
                      :
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Post Job
                      </Button>
                  }
              </Grid>
            </Grid>
          </Box>
    </Layout>
  )
}