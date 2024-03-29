import { Button, FormHelperText, Grid, FormGroup, Checkbox, Typography, Box, TextField, FormControl, Stack, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import CheckboxGroup from '../CheckboxGroup';
import getValidationSchema from "./ValidationSchema";

export default function Community({ formValues, nextStep, previousStep, setFormState }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(['e26', 'e27', 'e28', 'e29', 'e30', 'e31', 'e32', 'e33', 'e34', 'e35', 'e36', 'e37', 'e38', 'e38b', 'e39', 'e39b', 'e40', 'e41', 'e41b', 'e42', 'e43']);

        if (schema.isValidSync(fields, { abortEarly: false })) {
            setFormState({ loading: true, error: false, message: "Loading..." });
            await fetch(`/api/elevi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            }).then(async res => {
                const data = await res.json();


                if (!res.ok)
                    return Promise.reject(data)

                setFormState({ loading: false, error: false, message: data.message });
                nextStep(fields);
                return data;
            }).catch(err => {
                setFormState({ loading: false, error: true, message: err.message });

                if (err.errors) {
                    setErrors(err.errors);
                }

                nextStep(fields);
                return err;
            });
        } else {
            schema.validate(fields, { abortEarly: false }).catch(err => {
                let errors = err.inner.reduce((acc, error) => {
                    return {
                        [error.path]: error.errors,
                        ...acc
                    }
                }, {})

                setErrors((values) => ({ ...errors }))
            })
        }
    }

    const handlePrevious = (e) => {
        previousStep();
    }

    return (
        <FormWrapper onSubmit={handleSubmit} onPrevious={handlePrevious}>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bună este relația ta cu profesorii?"
                    helper="Întrebarea se referă la: respectul reciproc, susținerea acordată etc."
                    id="e26"
                    defaultValue={fields.e26}
                    errors={errors.e26}
                    onChange={(e) => handleChange(e, "e26")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bună este relația ta cu dirigintele?"
                    helper="Întrebarea se referă la: desfășurarea orelor de dirigenție, atenția acordată problemelor personale etc."
                    id="e27"
                    defaultValue={fields.e27}
                    errors={errors.e27}
                    onChange={(e) => handleChange(e, "e27")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des aveți discuții libere în timpul orelor?"
                    id="e28"
                    defaultValue={fields.e28}
                    errors={errors.e28}
                    onChange={(e) => handleChange(e, "e28")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult consideri că profesorii își dau interesul în timpul orelor?"
                    helper="De exemplu: pregătirea pentru oră, ascultarea sugestiilor din partea elevilor, entuziasmul cu care predau etc."
                    id="e29"
                    defaultValue={fields.e29}
                    errors={errors.e29}
                    onChange={(e) => handleChange(e, "e29")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bine consideri că se descurcă profesorii cu dispozitivele electronice în timpul orelor?"
                    helper="De exemplu: utilizarea în timpul orelor a calculatorului, aplicațiilor, proiectorului, tablei inteligente etc."
                    id="e30"
                    defaultValue={fields.e30}
                    errors={errors.e30}
                    onChange={(e) => handleChange(e, "e30")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult consideri că profesorii pun accentul pe teme pentru acasă?"
                    helper="Prin teme pentru acasă ne referim la teme, proiecte, învățat etc."
                    id="e31"
                    defaultValue={fields.e31}
                    errors={errors.e31}
                    onChange={(e) => handleChange(e, "e31")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cum ai descrie starea ta generală la liceu?"
                    helper="De exemplu: în relațiile cu colegii și cu profesorii, nivelul de stres dat de liceu etc."
                    id="e32"
                    defaultValue={fields.e32}
                    errors={errors.e32}
                    onChange={(e) => handleChange(e, "e32")}
                    customOptions={[
                        {
                            value: 1,
                            label: 'Foarte stresat'
                        },
                        {
                            value: 2,
                            label: 'Stresat'
                        },
                        {
                            value: 3,
                            label: 'Moderat'
                        },
                        {
                            value: 4,
                            label: 'Relaxat'
                        },
                        {
                            value: 5,
                            label: 'Foarte relaxat'
                        },
                    ]}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Care sunt principalele tale surse de stres?"
                    id="e33"
                    defaultValue={fields.e33}
                    errors={errors.e33}
                    onChange={(e) => handleChange(e, "e33")}
                    options={["Colectivul de elevi", "Colectivul de profesori", "Prestigiul liceului", "Programul", "Transportul către liceu", "Temele pentru acasă", "Evaluările", "Personalul auxiliar (secretariat, pază, etc.)", "Lipsa de timp pentru pregătire", "Altele", "Niciuna"]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult consideri că profesorii sunt corecți cu elevii?"
                    helper="De exemplu: compară rezultatele unor anumiți elevi, menționează elevi ca exemple negative sau pozitive etc."
                    id="e34"
                    defaultValue={fields.e34}
                    errors={errors.e34}
                    onChange={(e) => handleChange(e, "e34")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Simți că profesorii te respectă?"
                    id="e35"
                    defaultValue={fields.e35}
                    errors={errors.e35}
                    onChange={(e) => handleChange(e, "e35")}
                    customOptions={[
                        {
                            value: 2,
                            label: 'Da'
                        },
                        {
                            value: 1,
                            label: 'Unii da, unii nu'
                        },
                        {
                            value: 0,
                            label: 'Nu'
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de multă presiune pun profesorii pe elevi să aibă rezultate foarte bune?"
                    helper="De exemplu: note cât mai mari la evaluări, să fie foarte atenți la ore, să aibă rezultate bune la concursuri, etc."
                    id="e36"
                    defaultValue={fields.e36}
                    errors={errors.e36}
                    onChange={(e) => handleChange(e, "e36")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult simți că este apreciată munca ta de către profesori?"
                    id="e37"
                    defaultValue={fields.e37}
                    errors={errors.e37}
                    onChange={(e) => handleChange(e, "e37")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Selectează cazurile care se potrivesc pentru liceul tău:"
                    id="e38"
                    defaultValue={fields.e38}
                    errors={errors.e38}
                    onChange={(e) => handleChange(e, "e38")}
                    options={["Există discriminare din partea profesorilor față de elevi", "Există discriminare din partea elevilor față de profesori", "Există discriminare din partea profesorilor față de profesori", "Există discriminare din partea elevilor față de elevi", "Nu există discriminare"]}
                />
            </Grid>

            {(fields.e38 && fields.e38.length > 0 && !fields.e38.includes("4")) && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`e38b-label`}>Te rugăm să ne povestești un exemplu de discriminare din liceul tău.</Typography>
                    <FormHelperText error>{errors.e38b}</FormHelperText>
                    <TextField
                        id="e38b"
                        label="Introdu aici exemplul tău."
                        multiline
                        rows={4}
                        value={fields.e38b}
                        fullWidth
                        onChange={(e) => handleChange(e, "e38b")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="ternary"
                    label="Te simți în largul tău la liceu?"
                    id="e37"
                    defaultValue={fields.e39}
                    errors={errors.e39}
                    onChange={(e) => handleChange(e, "e39")}
                />
            </Grid>

            {(fields.e39 == 0 || fields.e39 == 1) && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`e17-label`}>Ce te face să nu te simți în largul tău?</Typography>
                    <FormHelperText error>{errors.e39b}</FormHelperText>
                    <TextField
                        id="e39b"
                        label="Introdu aici exemplul tău."
                        multiline
                        rows={4}
                        value={fields.e39b}
                        fullWidth
                        onChange={(e) => handleChange(e, "e39b")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des apar conflicte între elevi la liceu?"
                    id="e40"
                    defaultValue={fields.e40}
                    errors={errors.e40}
                    onChange={(e) => handleChange(e, "e40")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Selectează cazurile care se potrivesc pentru liceul tău:"
                    id="e41"
                    defaultValue={fields.e41}
                    errors={errors.e41}
                    onChange={(e) => handleChange(e, "e41")}
                    options={["Există comportament agresiv din partea profesorilor față de elevi", "Există comportament agresiv din partea elevilor față de profesori", "Există comportament agresiv din partea profesorilor față de profesori", "Există comportament agresiv din partea elevilor față de elevi", "Nu există comportament agresiv"]}
                />
            </Grid>

            {(fields.e41 && fields.e41.length > 0 && !fields.e41.includes("4")) && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`e41b-label`}>Te rugăm să ne povestești un exemplu de comportament agresiv din liceul tău.</Typography>
                    <FormHelperText error>{errors.e41b}</FormHelperText>
                    <TextField
                        id="e41b"
                        label="Introdu aici exemplul tău."
                        multiline
                        rows={4}
                        value={fields.e41b}
                        fullWidth
                        onChange={(e) => handleChange(e, "e41b")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de greu a fost să-ți faci prieteni la liceu?"
                    id="e43"
                    defaultValue={fields.e43}
                    errors={errors.e43}
                    onChange={(e) => handleChange(e, "e43")}
                    customOptions={[
                        {
                            value: 1,
                            label: 'Foarte ușor'
                        },
                        {
                            value: 2,
                            label: 'Ușor'
                        },
                        {
                            value: 3,
                            label: 'Moderat'
                        },
                        {
                            value: 4,
                            label: 'Greu'
                        },
                        {
                            value: 5,
                            label: 'Foarte greu'
                        },
                    ]}
                    inLine={1}
                />
            </Grid>
        </FormWrapper>
    )
}