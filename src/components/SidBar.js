import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    Divider,
    Box,
    Collapse,
    IconButton,
    Grid,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Sidebar = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [expandedCountries, setExpandedCountries] = useState({});

    useEffect(() => {
        const headers = {
            "X-RapidAPI-Key": "24bf54b9cbmsh69add60894a99acp16e084jsn3fbe9469b429",
            "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com"
        };

        // Fetch data from the API
        fetch('https://free-football-soccer-videos.p.rapidapi.com/', { headers })
            .then(response => response.json())
            .then(data => {
                setMatches(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to handle checkbox change
    const handleCheckboxChange = (match) => {
        if (selectedMatches.some(selectedMatch => selectedMatch.competition.name === match.competition.name)) {
            setSelectedMatches(selectedMatches.filter(selectedMatch => selectedMatch.competition.name !== match.competition.name));
        } else {
            const relatedMatches = matches.filter(m => m.competition.name === match.competition.name);
            setSelectedMatches([...selectedMatches, ...relatedMatches]);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Function to display embeds for selected matches
    const renderSelectedMatchEmbeds = () => {
        if (selectedMatches.length === 0) {
            return null;
        }
        return (
            <Box sx={{ marginTop: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', width: '100%' }}>
                <Grid container spacing={2}>
                    {selectedMatches.map((match, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card style={{ marginBottom: 20 }}>
                                <CardContent>
                                    <Typography variant="h6">{match.title}</Typography>
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%' }}>
                                        {match.embed && match.embed.includes('src=') && (
                                            <iframe
                                                src={match.embed.match(/src=["']([^"']+)["']/)?.[1]}
                                                frameBorder="0"
                                                width="100%"
                                                height="100%"
                                                allowFullScreen
                                                title="Embedded Video"
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    // Organize matches by country and league name
    const matchesByCountry = matches.reduce((acc, match) => {
        const country = match.competition.name.split(':')[0].trim();
        const league = match.competition.name.split(':')[1].trim();
        if (!acc[country]) {
            acc[country] = {};
        }
        if (!acc[country][league]) {
            acc[country][league] = match;
        }
        return acc;
    }, {});

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <Card style={{ margin: 19, width: '25rem' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>All Matches</Typography>
                    <FormGroup>
                        {Object.entries(matchesByCountry).map(([country, leagues]) => (
                            <div key={country}>
                                <div style={{ display: 'flex', marginTop: 2, alignItems: 'center' }}>
                                    <IconButton
                                        onClick={() => setExpandedCountries(prev => ({ ...prev, [country]: !prev[country] }))}
                                        size="small"
                                    >
                                        <AddCircleOutlineIcon sx={{color:'green'}}/>
                                    </IconButton>
                                        {country}
                                </div>
                                <Collapse in={expandedCountries[country]} timeout="auto" unmountOnExit>
                                    <FormGroup>
                                        {Object.entries(leagues).map(([league, match]) => (
                                            <FormControlLabel
                                                sx={{ ml: 3 }}
                                                key={league}
                                                control={
                                                    <Checkbox
                                                        checked={selectedMatches.includes(match)}
                                                        onChange={() => handleCheckboxChange(match)}
                                                    />
                                                }
                                                label={league}
                                            />
                                        ))}
                                    </FormGroup>
                                </Collapse>
                            </div>
                        ))}
                    </FormGroup>
                </CardContent>
            </Card>
            <Divider />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                {matches.length === 0 && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}
                <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                    {renderSelectedMatchEmbeds()}
                </Box>
            </Box>
        </div>
    );
}

export default Sidebar;
