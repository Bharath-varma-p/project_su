import React from 'react';
import './RoadmapVisualizer.css';

const RoadmapVisualizer = ({ roadmapData }) => {
    if (!roadmapData || !roadmapData.steps || !Array.isArray(roadmapData.steps)) {
        return <div>Invalid roadmap data structure</div>;
    }

    const renderStep = (step) => {
        const hasChildren = step.dependencies && Array.isArray(step.dependencies) && step.dependencies.length > 0;
        const childSteps = hasChildren 
            ? roadmapData.steps.filter(s => step.dependencies.includes(s.id))
            : [];

        return (
            <div key={step.id} className="roadmap-step">
                <div className={`step-content ${hasChildren ? 'has-children' : ''}`}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <span className="estimated-time">{step.estimatedTime}</span>
                </div>
                {hasChildren && (
                    <div className="step-children">
                        {childSteps.map(renderStep)}
                    </div>
                )}
            </div>
        );
    };

    const rootSteps = roadmapData.steps.filter(step => 
        !step.dependencies || !Array.isArray(step.dependencies) || step.dependencies.length === 0
    );

    return (
        <div className="roadmap-container">
            <h2 className="roadmap-title">{roadmapData.title}</h2>
            <div className="roadmap-content">
                {rootSteps.map(renderStep)}
            </div>
        </div>
    );
};

export default RoadmapVisualizer;