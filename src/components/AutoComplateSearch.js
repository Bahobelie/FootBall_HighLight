import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function AutoCompleteSearch() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        const headers = {
            "X-RapidAPI-Key": "24bf54b9cbmsh69add60894a99acp16e084jsn3fbe9469b429",
            "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com"
        };

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                fetch('https://free-football-soccer-videos.p.rapidapi.com/', { headers })
                    .then(response => response.json())
                    .then(data => {
                        const leaguesSet = new Set(); // Using Set to avoid duplicates
                        data.forEach(match => {
                            const league = match.competition.name.split(':')[1].trim();
                            leaguesSet.add(league);
                        });
                        const leagues = Array.from(leaguesSet);
                        setOptions(leagues);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
