// TeamContainer.tsx

import React from 'react';
import TeamDashboard from './TeamManagement';
import TeamManagement from './TeamManagement';

const TeamContainer: React.FC<{ userId: string }> = ({ userId }) => {
    return (
        <div>
            <TeamDashboard />
            <TeamManagement userId={userId} />
        </div>
    );
};

export default TeamContainer;
