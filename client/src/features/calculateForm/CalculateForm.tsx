import { Grid, TextField, FormControl, Select, InputLabel, MenuItem, Input, InputAdornment, Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateInsurance } from './calculateSumAssuredReducer';
import { GetProductRequest } from './getProductModel';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../app/store';

const CalculateForm = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('MALE');
    const [dob, setDOB] = useState('1990-01-01');
    const [plan, setPlan] = useState('T11A20');
    const [premium, setPremium] = useState<number>(0);
    const [paymentFrequency, setPaymentFrequency] = useState('YEARLY');
    const [formValid, setFormValid] = useState({
        firstNameValid: true,
        surnameValid: true,
        planValid: true,
        premiumValid: true,
    });
    const dispatch = useDispatch();
    const calculateSuccess = useSelector((state: RootState) => state.calculateAssured.success);

    const validateForm = (): boolean => {
        let valid = true;
        let errors: any = {
            firstNameValid: true,
            surnameValid: true,
            premiumValid: true,
        }
        if (!firstName) {
            errors.firstNameValid = false;
            valid = false;
        }
        if (!surname) {
            errors.surnameValid = false;
            valid = false;
        }
        if (premium <= 0) {
            errors.premiumValid = false;
            valid = false;
        }
        setFormValid(errors);
        return valid;
    }

    if (calculateSuccess) {
        return <Redirect push to='/result' />
    }

    const handleSubmit = async (evt: any) => {
        evt.preventDefault();
        if (validateForm()) {
            let req: GetProductRequest = {
                firstName: firstName,
                lastName: surname,
                gender: gender,
                dob: dob,
                plan: plan,
                premium: premium,
                paymentTerm: paymentFrequency
            };
            dispatch(calculateInsurance(req));
        }
    }

    const handleFirstNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFirstName(event.target.value as string);
    };

    const handleSurameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSurname(event.target.value as string);
    };

    const handleDobChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDOB(event.target.value as string);
    };

    const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value as string);
    };

    const handlePlanChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlan(event.target.value as string);
    };

    const handlePremiumChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPremium(event.target.value as number);
    };

    const handlePaymentFrequencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPaymentFrequency(event.target.value as string);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={6}>
                            <TextField 
                                label="First name" 
                                id="firstName" 
                                fullWidth 
                                error={!formValid.firstNameValid}
                                helperText={formValid.firstNameValid ? '' : 'Incorrect entry.'}
                                onChange={handleFirstNameChange}
                                placeholder="First name" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Surname" 
                                id="surname" 
                                fullWidth 
                                error={!formValid.surnameValid}
                                helperText={formValid.surnameValid ? '' : 'Incorrect entry.'}
                                onChange={handleSurameChange}
                                placeholder="Surname"  />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
                                    value={gender}
                                    onChange={handleGenderChange}
                                    >
                                <MenuItem value={'MALE'}>Male</MenuItem>
                                <MenuItem value={'FEMALE'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            id="dob"
                            label="Date of birth"
                            type="date"
                            defaultValue="1990-01-01"
                            fullWidth
                            onChange={handleDobChange}
                            InputLabelProps={{
                            shrink: true
                            }}
                        />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="plan">Plan</InputLabel>
                                    <Select
                                        labelId="plan"
                                        id="plan"
                                        value={plan}
                                        onChange={handlePlanChange}
                                        >
                                    <MenuItem value={'T11A20'}>package 1 (benefit 200k)</MenuItem>
                                    <MenuItem value={'T11A50'}>package 2 (benefit 500k)</MenuItem>
                                    <MenuItem value={'T11AM1'}>package 3 (benefit 1M)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="premium">Premium</InputLabel>
                                    <Input
                                        id="premium"
                                        value={premium}
                                        onChange={handlePremiumChange}
                                        error={!formValid.premiumValid}
                                        startAdornment={<InputAdornment position="start">฿</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="paymentFrequency">Payment Frequency</InputLabel>
                                    <Select
                                        labelId="paymentFrequency"
                                        id="paymentFrequency"
                                        value={paymentFrequency}
                                        onChange={handlePaymentFrequencyChange}
                                    >
                                    <MenuItem value={'YEARLY'}>Yearly</MenuItem>
                                    <MenuItem value={'HALFYEARLY'}>Half Yearly</MenuItem>
                                    <MenuItem value={'QUARTERLY'}>Quarterly</MenuItem>
                                    <MenuItem value={'MONTHLY'}>Monthly</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default CalculateForm;