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

const Register = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (value) => {
      const { user, error } = await supabase.auth.signUp(value);
      try {
        localStorage.setItem("userId", user.id);
        enqueueSnackbar("Berhasil", { variant: "success" });
        router.push("/");
      } catch {
        enqueueSnackbar("Gagal", { variant: "error" });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Daftar | Bakoel</title>
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
                Daftar Akun
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Gunakan email anda untuk mendaftarkan akun
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox name="policy" onChange={formik.handleChange} />
              <Typography color="textSecondary" variant="body2">
                Saya akan menerima
                <NextLink href="#" passHref>
                  <Link ml="4px" color="primary" underline="always" variant="subtitle2">
                    syarat dan ketentuan
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Daftar
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Sudah punya Akun?
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Masuk
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
