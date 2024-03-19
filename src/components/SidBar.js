import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    Divider
} from "@mui/material";
import Box from "@mui/material/Box";

const Sidebar = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatches, setSelectedMatches] = useState([]);

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
    };


    // Function to display embeds for selected matches

    console.log(selectedMatches);
    const renderSelectedMatchEmbeds = () => {
        if (selectedMatches.length === 0) {
            return null;
        }
        return (
            <div style={{ marginTop: 20 }}>
                {selectedMatches.map((match, index) => (
                    <Card key={index} style={{ marginBottom: 20, width: '85rem' }}>
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
                ))}
            </div>
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
 console.log(matches.length);
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {matches.length > 0 ? (
                <div style={ {margin: 19} }>
                    { Object.entries(matchesByCountry).map(([country, leagues]) => (
                            <Card key={ country } style={ {marginBottom: 20, width: "25rem"} }>
                                <CardContent>
                                    <Typography variant="h5">{ country }</Typography>
                                    <FormGroup>
                                        { Object.entries(leagues).map(([league, match]) => (
                                            <FormControlLabel
                                                key={ league }
                                                control={
                                                    <Checkbox
                                                        checked={ selectedMatches.includes(match) }
                                                        onChange={ () => handleCheckboxChange(match) }
                                                    />
                                                }
                                                label={ league }
                                            />
                                        )) }
                                    </FormGroup>
                                </CardContent>
                            </Card>
                    )) }
                    { Object.entries(matchesByCountry).map(([country, leagues]) => (
                        <Card key={ country } style={ {marginBottom: 20, width: "25rem"} }>
                            <CardContent>
                                <Typography variant="h5">{ country }</Typography>
                                <FormGroup>
                                    { Object.entries(leagues).map(([league, match]) => (
                                        <FormControlLabel
                                            key={ league }
                                            control={
                                                <Checkbox
                                                    checked={ selectedMatches.includes(match) }
                                                    onChange={ () => handleCheckboxChange(match) }
                                                />
                                            }
                                            label={ league }
                                        />
                                    )) }
                                </FormGroup>
                            </CardContent>
                        </Card>
                    )) }
                </div>
            ):(
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) }
            <Divider/>
            { renderSelectedMatchEmbeds() }
        </div>
    );
}

export default Sidebar;
