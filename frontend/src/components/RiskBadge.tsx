import React from 'react';
import { Chip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface RiskBadgeProps {
    zone: string;
}

const getZoneColor = (zone: string) => {
    switch (zone) {
        case 'Critical': return 'error';
        case 'Risk': return 'warning';
        case 'Neutral': return 'default';
        case 'Growth': return 'info'; // Use info or success
        case 'Wealth': return 'success';
        case 'Wealth Building': return 'success';
        default: return 'default';
    }
};

const getZoneIcon = (zone: string) => {
    switch (zone) {
        case 'Critical': return <WarningIcon />;
        case 'Risk': return <RemoveCircleIcon />;
        case 'Neutral': return <RemoveCircleIcon />; // Or specific icon
        case 'Growth': return <TrendingUpIcon />;
        case 'Wealth': return <CheckCircleIcon />;
        case 'Wealth Building': return <CheckCircleIcon />;
        default: return undefined;
    }
};

const RiskBadge: React.FC<RiskBadgeProps> = ({ zone }) => {
    return (
        <Chip
            label={zone}
            color={getZoneColor(zone) as any}
            icon={getZoneIcon(zone)}
            sx={{ fontWeight: 'bold', fontSize: '1rem', padding: 1 }}
        />
    );
};

export default RiskBadge;
