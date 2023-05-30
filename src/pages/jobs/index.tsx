import Layout from '../../layout/common'
import JobList from '../../components/JobList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export default function Jobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const firestore = useFirestore();
  const jobsRef = collection(firestore, `jobs`);
  const { status: jobsFetchStatus, data: jobsData } = useFirestoreCollectionData(jobsRef);
  const jobId = searchParams.get('id') || jobsData?.[0].NO_ID_FIELD;
  const jobData = jobsData?.find(({NO_ID_FIELD: i}) => i === jobId);

  if(jobsFetchStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  const toEditPage = () => {
    return navigate({
      pathname: "/jobs/create",
      search: createSearchParams({
          id: jobId,
      }).toString()
    })
  }



  return (
    <Layout>
      <Box
        maxWidth="lg"
        component="main"
        sx={{ mt: 3, width: '100%' }}
      >
        <Grid container spacing={2} justifyContent="center" >
          <Grid item xs={12} sm={4}>
            <JobList sx={{
                flex: 1,
                width: '100%',
                bgcolor: 'background.paper',
                position: 'sticky',
                top: 20,
                overflow: 'auto',
                overflowY: 'scroll',
                minHeight: 360,
                maxHeight: '85vh',
                '& ul': { padding: 0 },
                border: '0.5px solid lightGrey',
                borderRadius: 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }}
              jobs={jobsData}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              component="div"
              sx={{ 
                maxHeight: '85vh',
                overflow: 'auto',
                border: '0.5px solid lightGrey',
                minHeight: 600,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                p: 4,
                position: 'relative'
              }}
            >
              <Typography component="h1" variant="h3">
                {jobData?.title}
              </Typography>
              <b>
                <Typography component="p" >
                  <b>{jobData?.companyId}</b> - {jobData?.type}, {jobData?.location}
                </Typography>
              </b>
              <br />
              <br />
              <br />

              <div data-color-mode="light">
                <MDEditor.Markdown source={jobData?.about} style={{ whiteSpace: 'pre-wrap' }} /> 
              </div>
              <Button
                style={{position: 'absolute', top:0, right:0, borderBottomLeftRadius: 10, borderTopLeftRadius: 0, borderBottomRightRadius: 0}}
                variant="contained"
                onClick={toEditPage}
              >
                <EditIcon/>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}