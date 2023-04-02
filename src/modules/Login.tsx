import React, { useState } from 'react';
import {
	Image,
	Box,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../Redux/hooks';
import { addEmail } from '../Redux/slice';
const Login = () => {
	const [loading, setLoading] = useState(false);
	const route = useRouter();
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('Email está no formato invalido')
				.required('Campo obrigatório'),
			password: Yup.string()
				.required('Necessário a utilização de senha')
				.min(6, 'Necessário no minimo 6 caracteres'),
		}),
		onSubmit: async (values) => {
			setLoading(true);

			dispatch(addEmail(values.email));

			route.push('/home');

			setLoading(false);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Box mt='10%' p="16px" mx="auto" w={{ base: 320, sm: 400, md: 500 }}>
				<Image
					mx="auto"
					src="images/rick.jpg"
					alt="rick and morty logo"
					w="375px"
				/>
				<FormControl mt="16px" isInvalid={!!formik.errors.email}>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder="Email"
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					{formik.errors.email ? (
						<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
					) : (
						<FormHelperText>Esse campo so aceita email.</FormHelperText>
					)}
				</FormControl>

				<FormControl mt="16px" isInvalid={!!formik.errors.password}>
					<FormLabel>Senha</FormLabel>
					<Input
						type="password"
						placeholder="Senha"
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.errors.password ? (
						<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
					) : (
						<FormHelperText>Informe a senha.</FormHelperText>
					)}
				</FormControl>

				<Box alignSelf="center" mt="16px">
					<Button
						w="100%"
						isLoading={loading}
						colorScheme="blue"
						m="0 auto"
						type="submit"
					>
						Entrar
					</Button>
				</Box>
			</Box>
		</form>
	);
};

export default Login;
