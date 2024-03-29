import HsCard from "@components/HsCard";
import Layout from "@components/Layout";
import { Box, Typography, Autocomplete, TextField, Skeleton, Alert, useMediaQuery, styled, alpha, Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 1),
    },
  }
}));

export default function Rezultate() {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { data: availHs, error: hsError } = useSWR<{ hs: string, records: number }[], any>("/api/hs");
  const { data: topHs, error: topError } = useSWR<{ hs: string, real: number, records: number }[], any>("/api/hs?filterBy=real");

  return (
    <Layout>
      <Head>
        <title>Rezultate 2022 | Registrul Educațional Alternativ</title>
      </Head>
      <Box sx={{ backgroundImage: (prefersDarkMode ? "url(/background-dark.png)" : "url(/background-light.png)") }}>
        <Container sx={{ py: 10 }} maxWidth="lg">
          <Typography variant="h3" sx={{fontSize:{xs:"xx-large"}}}>
            Caută rezultatele liceului tău!
            <Autocomplete
              disableClearable
              options={availHs ? availHs.map(({ hs }) => hs) : []}
              sx={{ width: { md: "70%", xs: "100%" }, my: 2 }}
              onChange={(e, value) => router.push(`/${value}`)}
              renderInput={(params) => {

                if (!availHs && !hsError) return <Skeleton variant="rounded" height={50} />
                if (hsError) return <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>

                return (
                  <StyledTextField
                    {...params}
                    variant="filled"
                    label="Caută liceul..."
                    // sx={(theme) => { return { backgroundColor: theme.palette.background.paper } }}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                );
              }}
            />
          </Typography>
        </Container>
      </Box>
      <Container sx={{ my: 5 }} maxWidth="lg">
        <Typography variant="h4" sx={{ my: 2, textAlign: "center" }}>Top licee</Typography>
        {topError && <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>}
        {(!topHs && !topError) && (
          <Grid sx={{ my: 2 }} container spacing={2}>
            <Grid item md={4} xs={12}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          </Grid>
        )}
        {topHs && (
          <>
            <Grid container spacing={2}>
              {topHs.slice(0, 3).map(({ hs, real, records }, idx) => (
                <Grid key={idx} item md={4} xs={12}>
                  <HsCard hs={hs} real={real} pos={idx + 1} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ my: 2, textAlign: "center" }}>
              <Button href="/top" color="secondary" variant="outlined" startIcon={<FormatListNumberedIcon />}>Vezi topul liceelor</Button>
            </Box>
          </>
        )}

      </Container>
    </Layout>
  )
}