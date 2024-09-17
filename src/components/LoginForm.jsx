import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Form } from "formik";
import { useSelector } from "react-redux";
import {object, string} from "yup";

export const SignInSchema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .required()
    .min(8)
    .matches(/\d+/, "En az bir rakam içermelidir!")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir!")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir!")
    .matches(
      /[@$%&?!*]+/,
      "(@$%&?!*) özel karakterlerinden en az bir tanesini içermelidir!"
    ),
});

const LoginForm = ({ values, errors, touched, handleChange, handleBlur }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          {!loading ? (
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          ) : (
            <Button type="submit" variant="contained" disabled={loading}>
              <CircularProgress />
            </Button>
          )}
        </Box>
      </Form>
    </div>
  );
};

export default LoginForm;
