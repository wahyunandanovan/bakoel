import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { supabase } from "src/utils/supabase";
import { useSnackbar } from "notistack";

const Create = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("nama tidak boleh kosong"),
      address: Yup.string().required("alamat tidak boleh"),
      phone: Yup.string().required("no hp tidak boleh kosong"),
    }),
    onSubmit: async (value) => {
      const { data, error } = await supabase
        .from("bakoel")
        .insert([{ name: value.name, address: value.address, phone: value.phone }]);
      try {
        enqueueSnackbar("Berhasil", { variant: "success" });
        router.push("/customers/customers");
      } catch {
        enqueueSnackbar("Gagal", { variant: "error" });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Pelanggan | Bakoel</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Pelanggan
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                catat data pelanggan usaha anda
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Nama"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Alamat"
              margin="normal"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.address}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Nomor Hp"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.phone}
              variant="outlined"
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Create;
