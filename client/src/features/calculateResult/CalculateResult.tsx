import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Grid } from "@material-ui/core";
import { GetProductResponse } from "../calculateForm/getProductModel";

const CalculateResult = () => {
    const calculateAssured: GetProductResponse = useSelector((state: RootState) => state.calculateAssured.result) as GetProductResponse;
    console.log(calculateAssured);
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={6}>
                            <div style={{textAlign: 'center'}}>
                                <h3>Your calculate result</h3>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <span>Sum assure:</span>
                        </Grid>
                        <Grid item xs={5}>
                            <span>{calculateAssured.baseSumAssured}</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <span>Annual premium:</span>
                        </Grid>
                        <Grid item xs={5}>
                            <span>{calculateAssured.baseAnnualPremium}</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <span>Plan code:</span>
                        </Grid>
                        <Grid item xs={5}>
                            <span>{calculateAssured.plan.code}</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <span>Package:</span>
                        </Grid>
                        <Grid item xs={5}>
                            <span>{calculateAssured.plan.package}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default CalculateResult;