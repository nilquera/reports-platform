import { PDFDownloadLink } from "@react-pdf/renderer"
import { SearchBox } from "components"
import { Typography, Box, Divider, makeStyles, Button } from "@material-ui/core"
import { useFetchTriggered } from "hooks"
import PDF from "pdf/user"
import UserImpact from "./UserImpact"

const APIURL = process.env.REACT_APP_APIURL

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(4),
  },
}))

export default function Devices({ location }) {
  const { fetch, trigger } = useFetchTriggered()

  const classes = useStyles()
  const handleSubmit = (evt, input) => {
    evt.preventDefault()
    trigger(`${APIURL}/api/users/${input}`)
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h5">User Report</Typography>
        <br />
        <Typography variant="body1">
          Users of eReuse blockchain have ethereum addresses.
        </Typography>
        <Typography variant="body1">
          Use this form to extract updated user reports.
        </Typography>
      </Box>
      <Divider />
      <Box m={4}>
        <div className={classes.searchContainer}>
          <SearchBox
            handleSubmit={handleSubmit}
            location={location}
            placeholder="User Address"
          />
        </div>
      </Box>
      <Box m={4}>
        {fetch.status === "fetching" && <p>Fetching...</p>}
        {fetch.status === "error" && <p>{fetch.error}</p>}
        {fetch.status === "fetched" && (
          <>
            <Box m={4}>
              <UserImpact user={fetch.data.user} />
            </Box>
            <Box m={4}>
              <PDFDownloadLink
                document={<PDF user={fetch.data.user} />}
                fileName={`user_report_${fetch.data.user.address}.pdf`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Download PDF
                </Button>
              </PDFDownloadLink>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
