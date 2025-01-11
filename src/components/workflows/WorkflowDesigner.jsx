import { useEffect, useState } from 'react';
import { Plus, X, Settings, ArrowRight, Move, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableState } from './DraggableState';

const teams = [
    { id: 1, name: 'Technical Support' },
    { id: 2, name: 'Customer Service' },
    { id: 3, name: 'Account Management' }
];

const users = [
    { id: 1, name: 'John Smith', team: 1 },
    { id: 2, name: 'Sarah Johnson', team: 1 },
    { id: 3, name: 'Michael Brown', team: 2 }
];

// Add a new component for row drop zones
const RowDropZone = ({ rowIndex, position, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'STATE',
        drop: (item) => onDrop(item, rowIndex, position),
        collect: monitor => ({
            isOver: monitor.isDragging && monitor.isOver()
        })
    });

    return (
        <div
            ref={drop}
            className={`
          w-[200px] h-[100px] 
          border-2 border-dashed rounded-lg
          ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
          transition-colors duration-200
        `}
        />
    );
};

function WorkflowDesigner() {
    useEffect(() => {
        const handleScroll = () => {
            // Force a re-render of state positions
            setStatePositions(prev => ({ ...prev }));
        };

        const container = document.querySelector('.overflow-auto');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);
    const [selectedState, setSelectedState] = useState(null);
    const [isEditingState, setIsEditingState] = useState(false);

    // Recommendations
    const [recommendations, setRecommendations] = useState([]); // Replace stateActions
    const [showAddRecommendationModal, setShowAddRecommendationModal] = useState(false);
    const [newRecommendationData, setNewRecommendationData] = useState({
        name: '',
        description: '',
        condition: '',
        tooltip: '',
        actions: [] // Array of actions this recommendation will trigger
    });

    const [showActionModal, setShowActionModal] = useState(false);
    const [newAction, setNewAction] = useState({});
    const [activeRecommendationId, setActiveRecommendationId] = useState(null);
    
    // Actions
    const [stateActions, setStateActions] = useState({});
    const [showAddActionModal, setShowAddActionModal] = useState(false);
    const [statePositions, setStatePositions] = useState({});
   
    // Add state
    const [showAddStateModal, setShowAddStateModal] = useState(false);
    const [newStateName, setNewStateName] = useState('');
    const [newStateType, setNewStateType] = useState('normal');

    // Add Transition
    const [showAddTransitionModal, setShowAddTransitionModal] = useState(false);
    const [newTransitionTarget, setNewTransitionTarget] = useState('');
    const [newTransitionName, setNewTransitionName] = useState('');

    const [newActionData, setNewActionData] = useState({
        condition: '',
        tooltip: '',
        type: null
    });
    const [states, setStates] = useState([
        {
            id: 1,
            name: 'New',
            type: 'initial',
            color: 'bg-blue-100 border-blue-300 text-blue-700',
            row: 0,
            position: 0
        },
        {
            id: 2,
            name: 'Review',
            type: 'normal',
            color: 'bg-yellow-100 border-yellow-300 text-yellow-700',
            row: 0,
            position: 1
        },
        {
            id: 3,
            name: 'Approved',
            type: 'normal',
            color: 'bg-green-100 border-green-300 text-green-700',
            row: 0,
            position: 2
        },
        {
            id: 5,
            name: 'Rejected',
            type: 'final',
            color: 'bg-red-100 border-red-300 text-red-700',
            row: 2,
            position: 1
        }
    ]);

    const [transitions, setTransitions] = useState([
        {
            id: 1,
            from: 1,
            to: 2,
            name: 'Submit for Review',
            condition: null
        },
        {
            id: 2,
            from: 2,
            to: 3,
            name: 'Approve',
            condition: 'All approvers agreed'
        },
        {
            id: 3,
            from: 1,
            to: 4,
            name: 'Request Info',
            condition: 'Need more information'
        },
        {
            id: 4,
            from: 2,
            to: 5,
            name: 'Reject',
            condition: 'Does not meet criteria'
        }
    ]);

    const ACTION_TYPES = {
        TRANSITION: 'transition',
        API_WEBHOOK: 'api_webhook'
    };

    const ACTION_TYPE_CONFIGS = {
        [ACTION_TYPES.TRANSITION]: {
            label: 'Transition',
            description: 'Move case to another state',
            requiresTransition: true,
            fields: ['name', 'description']
        },
        [ACTION_TYPES.API_WEBHOOK]: {
            label: 'API Webhook',
            description: 'Call an external API',
            requiresIntegration: true,
            fields: ['name', 'integration', 'mapping']
        }
    };

    // Mock integrations data (this would come from your integrations state/store)
    const availableIntegrations = [
        { id: 1, name: 'Payment Gateway', type: 'webhook' },
        { id: 2, name: 'CRM System', type: 'webhook' },
        { id: 3, name: 'Email Service', type: 'webhook' }
    ];

    const handleEditAction = (stateId, actionId) => {
        setStateActions(prev => ({
            ...prev,
            [stateId]: prev[stateId].map(action =>
                action.id === actionId
                    ? { ...action, isEditing: !action.isEditing }
                    : action
            )
        }));
    };

    const handleDeleteAction = (stateId, actionId) => {
        setStateActions(prev => ({
            ...prev,
            [stateId]: prev[stateId].filter(action => action.id !== actionId)
        }));
    };

    const handleUpdateAction = (stateId, actionId, updates) => {
        setStateActions(prev => ({
            ...prev,
            [stateId]: prev[stateId].map(action =>
                action.id === actionId
                    ? { ...action, ...updates }
                    : action
            )
        }));
    };

    const moveState = (draggedState, newRow, newPosition) => {
        setStates(prevStates => {
            return prevStates.map(state => {
                if (state.id === draggedState.id) {
                    return { ...state, row: newRow, position: newPosition };
                }
                // If there's a state in the target position, swap their positions
                if (state.row === newRow && state.position === newPosition) {
                    return { ...state, row: draggedState.row, position: draggedState.position };
                }
                return state;
            });
        });
    };

    const handleStateClick = (state) => {
        setSelectedState(state);
        setIsEditingState(true);
    };

    // Group states by row
    const getStatesByRow = () => {
        const rows = {};
        states.forEach(state => {
            if (!rows[state.row]) {
                rows[state.row] = [];
            }
            rows[state.row].push(state);
        });
        return Object.entries(rows).sort((a, b) => Number(a[0]) - Number(b[0]));
    };

    const handleAddTransition = (fromStateId) => {
        const availableStates = states.filter(s =>
            s.id !== fromStateId &&
            !transitions.some(t => t.from === fromStateId && t.to === s.id)
        );

        if (availableStates.length > 0) {
            const newTransition = {
                id: Date.now(),
                from: fromStateId,
                to: availableStates[0].id,
                name: 'New Transition'
            };
            setTransitions([...transitions, newTransition]);
        }
    };

    const handleDeleteTransition = (transitionId) => {
        setTransitions(transitions.filter(t => t.id !== transitionId));
    };

    const handleDeleteState = (stateId) => {
        if (states.length > 2 && selectedState.type !== 'initial') {
            setStates(states.filter(s => s.id !== stateId));
            setTransitions(transitions.filter(t => t.from !== stateId && t.to !== stateId));
            setSelectedState(null);
            setIsEditingState(false);
        }
    };

    // Update the state movement handler
    const handleStateDrop = (draggedItem, newRow, newPosition) => {
        setStates(prevStates => {
            const updatedStates = prevStates.map(state => {
                if (state.id === draggedItem.id) {
                    return { ...state, row: newRow, position: newPosition };
                }
                // If there's a state in the target position, don't move it
                return state;
            });

            return updatedStates;
        });
    };

    // Add a function to add new row if needed
    const ensureRowExists = (rowIndex) => {
        if (rowIndex === -1) {
            // Shift all states down one row
            setStates(prevStates =>
                prevStates.map(state => ({
                    ...state,
                    row: state.row + 1
                }))
            );
            return 0;
        }
        return rowIndex;
    };

    const RowDropTarget = ({ rowIndex, onDrop }) => {
        const [{ isOver }, drop] = useDrop({
            accept: 'STATE',
            drop: (item) => onDrop(item, rowIndex),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });

        return (
            <div
                ref={drop}
                className={`absolute left-0 w-full h-8 -mt-4 ${isOver ? 'bg-blue-100 opacity-50' : ''
                    }`}
            />
        );
    };

    const handleStatePositionChange = (stateId, rect) => {
        setStatePositions(prev => ({
            ...prev,
            [stateId]: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            }
        }));
    };

    const getStateColor = (type) => {
        switch (type) {
          case 'initial':
            return 'bg-blue-100 border-blue-300 text-blue-700';
          case 'final':
            return 'bg-red-100 border-red-300 text-red-700';
          default:
            return 'bg-yellow-100 border-yellow-300 text-yellow-700';
        }
      };
      
      const handleAddState = () => {
        const newState = {
          id: Date.now(),
          name: newStateName,
          type: newStateType,
          color: getStateColor(newStateType),
          row: newStateRow,
          position: newStatePosition
        };
      
        setStates(prevStates => [...prevStates, newState]);
        setShowAddStateModal(false);
        setNewStateName('');
        setNewStateType('normal');
        setNewStateRow(0);
        setNewStatePosition(0);
      };

      const findEmptyPosition = () => {
        // Get all existing positions
        const occupiedPositions = states.map(s => ({
          row: s.row,
          position: s.position
        }));
      
        // First try to find an empty position in existing rows
        const existingRows = [...new Set(states.map(s => s.row))];
        for (const row of existingRows) {
          const positionsInRow = states
            .filter(s => s.row === row)
            .map(s => s.position);
          
          // Find first gap in positions
          for (let pos = 0; pos <= positionsInRow.length; pos++) {
            if (!positionsInRow.includes(pos)) {
              return { row, position: pos };
            }
          }
        }
      
        // If no gaps found, add to new row
        const newRow = existingRows.length > 0 ? Math.max(...existingRows) + 1 : 0;
        return { row: newRow, position: 0 };
      };

      const getActionDescription = (action) => {
        switch (action.type) {
          case 'transition':
            return `Transition to "${states.find(s => s.id === action.toState)?.name}"`;
          case 'assign':
            return `Assign to ${action.assigneeType === 'team' ? 'Team' : 'User'}: ${action.assigneeName}`;
          case 'webhook':
            return `Call ${availableIntegrations.find(i => i.id === action.integrationId)?.name}`;
          default:
            return 'Unknown action';
        }
      };

      const handleAddActionToRecommendation = (recommendationId) => {
        setActiveRecommendationId(recommendationId);
        setShowActionModal(true);
        setNewAction({});
      };
      
      const handleAddAction = () => {
        if (activeRecommendationId) {
          setRecommendations(prev => prev.map(rec => {
            if (rec.id === activeRecommendationId) {
              return {
                ...rec,
                actions: [...rec.actions, newAction]
              };
            }
            return rec;
          }));
        }
        setShowActionModal(false);
        setNewAction({});
        setActiveRecommendationId(null);
      };
      
      const removeActionFromRecommendation = (recommendationId, actionIndex) => {
        setRecommendations(prev => prev.map(rec => {
          if (rec.id === recommendationId) {
            const newActions = [...rec.actions];
            newActions.splice(actionIndex, 1);
            return {
              ...rec,
              actions: newActions
            };
          }
          return rec;
        }));
      };
      
      // Update handleEditRecommendation
      const handleEditRecommendation = (id) => {
        setRecommendations(prev => prev.map(rec => 
          rec.id === id 
            ? { ...rec, isEditing: !rec.isEditing }
            : rec
        ));
      };

      // Add these handler functions
    const handleAddRecommendation = () => {
        const newRecommendation = {
        id: Date.now(),
        name: newRecommendationData.name,
        description: newRecommendationData.description,
        condition: newRecommendationData.condition,
        tooltip: newRecommendationData.tooltip,
        actions: [],
        isEditing: true // Open for editing when created
        };
    
        setRecommendations(prev => [...prev, newRecommendation]);
        setShowAddRecommendationModal(false);
        setNewRecommendationData({
        name: '',
        description: '',
        condition: '',
        tooltip: '',
        actions: []
        });
    };
      

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-white rounded-lg border p-6">
                {/* Workflow Canvas */}
                <div className="border rounded-lg p-4 min-h-[600px] bg-gray-50 relative overflow-auto">
                    <div className="relative min-h-full">
                        {/* SVG Layer for Transitions */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{
                                minHeight: '600px',
                                overflow: 'visible' // This is important to see the edges clearly
                            }}
                        >
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <polygon
                                        points="0 0, 10 3.5, 0 7"
                                        fill="#94a3b8"
                                    />
                                </marker>
                            </defs>
                            {transitions.map(transition => {
                                const fromState = states.find(s => s.id === transition.from);
                                const toState = states.find(s => s.id === transition.to);
                                const fromPos = statePositions[fromState?.id];
                                const toPos = statePositions[toState?.id];

                                if (!fromState || !toState || !fromPos || !toPos) return null;

                                // Calculate the connection points
                                const fromPoint = {
                                    x: fromPos.x + fromPos.width,
                                    y: fromPos.y + (fromPos.height / 2)
                                };

                                const toPoint = {
                                    x: toPos.x,
                                    y: toPos.y + (toPos.height / 2)
                                };

                                // Create the path
                                let path = '';
                                if (fromState.row === toState.row) {
                                    const midX = (fromPoint.x + toPoint.x) / 2;
                                    path = `
                    M ${fromPoint.x} ${fromPoint.y}
                    C ${midX} ${fromPoint.y},
                        ${midX} ${toPoint.y},
                        ${toPoint.x} ${toPoint.y}
                    `;
                                } else {
                                    path = `
                    M ${fromPoint.x} ${fromPoint.y}
                    C ${fromPoint.x + 50} ${fromPoint.y},
                        ${toPoint.x - 50} ${toPoint.y},
                        ${toPoint.x} ${toPoint.y}
                    `;
                                }

                                return (
                                    <g key={transition.id}>
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke="#94a3b8"
                                            strokeWidth="2"
                                            markerEnd="url(#arrowhead)"
                                        />
                                        {/* Optional: Add connection points for debugging */}
                                        <circle cx={fromPoint.x} cy={fromPoint.y} r="3" fill="#94a3b8" />
                                        <circle cx={toPoint.x} cy={toPoint.y} r="3" fill="#94a3b8" />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* States Layer */}
                        <div className="relative z-10">
                            {getStatesByRow().map(([rowIndex, rowStates]) => {
                                // Calculate max positions in this row
                                const maxPosition = Math.max(...rowStates.map(s => s.position), -1);
                                const dropZones = Array(maxPosition + 2).fill(null);

                                return (
                                    <div key={rowIndex}>
                                        {/* Add a drop zone for new row */}
                                        {rowIndex === '0' && (
                                            <div className="flex items-center gap-16 mb-8 ml-[100px]">
                                                {Array(3).fill(null).map((_, i) => (
                                                    <RowDropZone
                                                        key={`new-row-${i}`}
                                                        rowIndex={-1}
                                                        position={i}
                                                        onDrop={handleStateDrop}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-16 mb-16 ml-[100px]">
                                            {dropZones.map((_, position) => {
                                                const state = rowStates.find(s => s.position === position);

                                                return state ? (
                                                    <DraggableState
                                                        key={state.id}
                                                        state={state}
                                                        moveState={moveState}
                                                        handleStateClick={handleStateClick}
                                                        onPositionChange={handleStatePositionChange}
                                                    />
                                                ) : (
                                                    <RowDropZone
                                                        key={`${rowIndex}-${position}`}
                                                        rowIndex={Number(rowIndex)}
                                                        position={position}
                                                        onDrop={handleStateDrop}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add State Button */}
                    <div className="absolute bottom-4 right-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowAddStateModal(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add State
                        </Button>
                    </div>
                </div>

                {/* Add State Modal */}
                {showAddStateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h2 className="text-lg font-medium mb-4">Add New State</h2>
                    
                    <div className="space-y-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State Name
                        </label>
                        <Input 
                            placeholder="Enter state name"
                            value={newStateName}
                            onChange={(e) => setNewStateName(e.target.value)}
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                        </label>
                        <select 
                            className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                            value={newStateType}
                            onChange={(e) => setNewStateType(e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="final">Final</option>
                        </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                        <Button 
                            variant="outline"
                            onClick={() => {
                            setShowAddStateModal(false);
                            setNewStateName('');
                            setNewStateType('normal');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={!newStateName}
                            onClick={() => {
                            const { row, position } = findEmptyPosition();
                            const newState = {
                                id: Date.now(),
                                name: newStateName,
                                type: newStateType,
                                color: getStateColor(newStateType),
                                row,
                                position
                            };
                            
                            setStates(prevStates => [...prevStates, newState]);
                            setShowAddStateModal(false);
                            setNewStateName('');
                            setNewStateType('normal');
                            }}
                        >
                            Add State
                        </Button>
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {/* State Configuration Panel */}
                {isEditingState && selectedState && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-lg font-medium">State Configuration</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {/* State Properties */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-gray-900">Properties</h4>
                                    {selectedState.type !== 'initial' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteState(selectedState.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State Name
                                        </label>
                                        <Input
                                            placeholder="Enter state name"
                                            value={selectedState.name}
                                            onChange={(e) => {
                                                setStates(states.map(s =>
                                                    s.id === selectedState.id
                                                        ? { ...s, name: e.target.value }
                                                        : s
                                                ));
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type
                                        </label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                            value={selectedState.type}
                                            onChange={(e) => {
                                                setStates(states.map(s =>
                                                    s.id === selectedState.id
                                                        ? { ...s, type: e.target.value }
                                                        : s
                                                ));
                                            }}
                                            disabled={selectedState.type === 'initial'}
                                        >
                                            <option value="initial">Initial</option>
                                            <option value="normal">Normal</option>
                                            <option value="final">Final</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-gray-900">Actions</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAddActionModal(true)}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Action
                                    </Button>
                                </div>
                                <div className="space-y-2 p-4 bg-gray-50 rounded-lg min-h-[200px]">
                                    {(stateActions[selectedState.id] || []).map((action) => (
                                        <div key={action.id}
                                            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                        >
                                            <div className="p-3 flex items-center justify-between">
                                                <div>
                                                    <span className="text-sm font-medium">{action.name || 'New Action'}</span>
                                                    <span className="ml-2 text-xs text-gray-500">{ACTION_TYPE_CONFIGS[action.type].label}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditAction(selectedState.id, action.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => handleDeleteAction(selectedState.id, action.id)}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {action.isEditing && (
                                                <div className="border-t p-3 space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Action Name
                                                        </label>
                                                        <Input
                                                            value={action.name || ''}
                                                            onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                name: e.target.value
                                                            })}
                                                            placeholder="Enter action name"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                        </label>
                                                        <Input
                                                            value={action.description || ''}
                                                            onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                description: e.target.value
                                                            })}
                                                            placeholder="Enter description"
                                                        />
                                                    </div>

                                                    {action.type === ACTION_TYPES.TRANSITION && (
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Transition To
                                                                </label>
                                                                <select
                                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                                    value={action.transitionId || ''}
                                                                    onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                        transitionId: e.target.value
                                                                    })}
                                                                >
                                                                    <option value="">Select transition...</option>
                                                                    {transitions
                                                                        .filter(t => t.from === selectedState.id)
                                                                        .map(transition => (
                                                                            <option key={transition.id} value={transition.id}>
                                                                                {states.find(s => s.id === transition.to)?.name}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`reassign-${action.id}`}
                                                                    checked={action.reassign || false}
                                                                    onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                        reassign: e.target.checked
                                                                    })}
                                                                    className="rounded border-gray-300"
                                                                />
                                                                <label
                                                                    htmlFor={`reassign-${action.id}`}
                                                                    className="text-sm text-gray-700"
                                                                >
                                                                    Reassign case on transition
                                                                </label>
                                                            </div>

                                                            {action.reassign && (
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Assign To
                                                                    </label>
                                                                    <select
                                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                                        value={action.assigneeId || ''}
                                                                        onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                            assigneeId: e.target.value,
                                                                            assigneeType: e.target.selectedOptions[0].getAttribute('data-type')
                                                                        })}
                                                                    >
                                                                        <option value="">Select assignee...</option>

                                                                        <optgroup label="Teams">
                                                                            {teams.map(team => (
                                                                                <option
                                                                                    key={`team-${team.id}`}
                                                                                    value={`team-${team.id}`}
                                                                                    data-type="team"
                                                                                >
                                                                                    👥 {team.name}
                                                                                </option>
                                                                            ))}
                                                                        </optgroup>

                                                                        <optgroup label="Users">
                                                                            {users.map(user => (
                                                                                <option
                                                                                    key={`user-${user.id}`}
                                                                                    value={`user-${user.id}`}
                                                                                    data-type="user"
                                                                                >
                                                                                    👤 {user.name}
                                                                                </option>
                                                                            ))}
                                                                        </optgroup>
                                                                    </select>
                                                                    <div className="mt-1 text-xs text-gray-500">
                                                                        {action.assigneeType === 'team' ? 'Will be assigned to team queue' : 'Will be assigned directly to user'}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {action.type === ACTION_TYPES.API_WEBHOOK && (
                                                        <>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Integration
                                                                </label>
                                                                <select
                                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                                    value={action.integrationId || ''}
                                                                    onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                        integrationId: e.target.value
                                                                    })}
                                                                >
                                                                    <option value="">Select integration...</option>
                                                                    {availableIntegrations.map(integration => (
                                                                        <option key={integration.id} value={integration.id}>
                                                                            {integration.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Data Mapping
                                                                </label>
                                                                <div className="space-y-2">
                                                                    <Input
                                                                        placeholder="case.customer.id → customerId"
                                                                        value={action.mapping || ''}
                                                                        onChange={(e) => handleUpdateAction(selectedState.id, action.id, {
                                                                            mapping: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-900">Recommendations</h4>
                                <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setShowAddRecommendationModal(true)}
                                >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Recommendation
                                </Button>
                            </div>
                            <div className="space-y-2 p-4 bg-gray-50 rounded-lg min-h-[200px]">
                                {recommendations.map((recommendation) => (
                                <div key={recommendation.id} 
                                    className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    <div className="p-3 flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium">{recommendation.name}</span>
                                        <span className="ml-2 text-xs text-gray-500">{recommendation.actions.length} actions</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleEditRecommendation(recommendation.id)}
                                        >
                                        Edit
                                        </Button>
                                        <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleDeleteRecommendation(recommendation.id)}
                                        >
                                        <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    </div>
                                    {recommendation.isEditing && (
                                    <div className="border-t p-3 space-y-3">
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Recommendation Name
                                        </label>
                                        <Input
                                            value={recommendation.name}
                                            onChange={(e) => handleUpdateRecommendation(recommendation.id, {
                                            name: e.target.value
                                            })}
                                            placeholder="e.g., Approve Request"
                                        />
                                        </div>

                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <Input
                                            value={recommendation.description}
                                            onChange={(e) => handleUpdateRecommendation(recommendation.id, {
                                            description: e.target.value
                                            })}
                                            placeholder="e.g., Approve the request and notify the customer"
                                        />
                                        </div>

                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Condition
                                        </label>
                                        <Input
                                            value={recommendation.condition}
                                            onChange={(e) => handleUpdateRecommendation(recommendation.id, {
                                            condition: e.target.value
                                            })}
                                            placeholder="e.g., case.status === 'Pending' && case.reviewCount >= 2"
                                        />
                                        </div>

                                        {/* Actions List */}
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Actions
                                        </label>
                                        <div className="space-y-2 mb-2">
                                            {recommendation.actions.map((action, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                                <span className="text-sm">{getActionDescription(action)}</span>
                                                <Button 
                                                variant="ghost" 
                                                size="sm"
                                                className="ml-auto"
                                                onClick={() => removeActionFromRecommendation(recommendation.id, index)}
                                                >
                                                <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            ))}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowAddActionModal(true)}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Action
                                        </Button>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                ))}
                            </div>
                            </div>

                            {showAddRecommendationModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h2 className="text-lg font-medium mb-4">Add New Recommendation</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <Input 
                                        placeholder="e.g., Approve Request"
                                        value={newRecommendationData.name}
                                        onChange={(e) => setNewRecommendationData(prev => ({
                                        ...prev,
                                        name: e.target.value
                                        }))}
                                    />
                                    </div>

                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <Input 
                                        placeholder="e.g., Approve the request and notify the customer"
                                        value={newRecommendationData.description}
                                        onChange={(e) => setNewRecommendationData(prev => ({
                                        ...prev,
                                        description: e.target.value
                                        }))}
                                    />
                                    </div>

                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <Input
                                        placeholder="e.g., case.status === 'Pending'"
                                        value={newRecommendationData.condition}
                                        onChange={(e) => setNewRecommendationData(prev => ({
                                        ...prev,
                                        condition: e.target.value
                                        }))}
                                    />
                                    <div className="mt-1 text-xs text-gray-500">
                                        When this condition is met, this recommendation will be shown to agents
                                    </div>
                                    </div>

                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Disabled Tooltip
                                    </label>
                                    <Input
                                        placeholder="e.g., This action requires manager approval"
                                        value={newRecommendationData.tooltip}
                                        onChange={(e) => setNewRecommendationData(prev => ({
                                        ...prev,
                                        tooltip: e.target.value
                                        }))}
                                    />
                                    <div className="mt-1 text-xs text-gray-500">
                                        Message shown when hovering over disabled recommendation
                                    </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-6">
                                    <Button 
                                        variant="outline"
                                        onClick={() => {
                                        setShowAddRecommendationModal(false);
                                        setNewRecommendationData({
                                            name: '',
                                            description: '',
                                            condition: '',
                                            tooltip: '',
                                            actions: []
                                        });
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700"
                                        disabled={!newRecommendationData.name}
                                        onClick={handleAddRecommendation}
                                    >
                                        Create
                                    </Button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Action Selection Modal */}
                            {showActionModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h2 className="text-lg font-medium mb-4">Add Action</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Action Type
                                    </label>
                                    <select 
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                        value={newAction.type || ''}
                                        onChange={(e) => setNewAction({ ...newAction, type: e.target.value })}
                                    >
                                        <option value="">Select action type...</option>
                                        <option value="transition">State Transition</option>
                                        <option value="assign">Assign Case</option>
                                        <option value="webhook">API Webhook</option>
                                    </select>
                                    </div>

                                    {newAction.type === 'transition' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Target State
                                            </label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                value={newAction.targetState || ''}
                                                onChange={(e) => setNewAction({...newAction, targetState: e.target.value})}
                                            >
                                                <option value="">Select target state...</option>
                                                {states.map(state => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {newAction.type === 'assign' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Assign To
                                            </label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                value={newAction.assignTo || ''}
                                                onChange={(e) => setNewAction({...newAction, assignTo: e.target.value})}
                                            >
                                                <option value="">Select assignee...</option>
                                                <optgroup label="Teams">
                                                    {teams.map(team => (
                                                        <option key={`team-${team.id}`} value={`team-${team.id}`}>
                                                            👥 {team.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="Users">
                                                    {users.map(user => (
                                                        <option key={`user-${user.id}`} value={`user-${user.id}`}>
                                                            👤 {user.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                        </div>
                                    )}

                                    {newAction.type === 'webhook' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Integration
                                            </label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                value={newAction.integrationId || ''}
                                                onChange={(e) => setNewAction({...newAction, integrationId: e.target.value})}
                                            >
                                                <option value="">Select integration...</option>
                                                {availableIntegrations.map(integration => (
                                                    <option key={integration.id} value={integration.id}>
                                                        {integration.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setShowActionModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button 
                                            className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => {
                                                const actionToAdd = {
                                                    id: Date.now(),
                                                    type: newAction.type,
                                                    ...newAction
                                                };
                                                setRecommendations(prev => prev.map(rec => {
                                                    if (rec.id === activeRecommendationId) {
                                                        return {
                                                            ...rec,
                                                            actions: [...rec.actions, actionToAdd]
                                                        };
                                                    }
                                                    return rec;
                                                }));
                                                setShowActionModal(false);
                                                setNewAction({});
                                            }}
                                            disabled={!newAction.type}
                                        >
                                            Add Action
                                        </Button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* action modal */}
                            {showAddActionModal && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                        <h2 className="text-lg font-medium mb-4">Add Action</h2>

                                        <div className="space-y-4">
                                            {/* Condition Fields - Added before action type selection */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Condition
                                                </label>
                                                <Input
                                                    value={newActionData.condition}
                                                    onChange={(e) => setNewActionData(prev => ({
                                                        ...prev,
                                                        condition: e.target.value
                                                    }))}
                                                    placeholder="e.g., case.priority === 'High'"
                                                />
                                                <div className="mt-1 text-xs text-gray-500">
                                                    Enter a condition that determines when this action is available.
                                                    Leave empty to always enable.
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Disabled Tooltip
                                                </label>
                                                <Input
                                                    value={newActionData.tooltip}
                                                    onChange={(e) => setNewActionData(prev => ({
                                                        ...prev,
                                                        tooltip: e.target.value
                                                    }))}
                                                    placeholder="e.g., This action requires high priority cases"
                                                />
                                                <div className="mt-1 text-xs text-gray-500">
                                                    Message to show when hovering over disabled action
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Select Action Type
                                                </label>
                                                {Object.entries(ACTION_TYPE_CONFIGS).map(([type, config]) => (
                                                    <button
                                                        key={type}
                                                        className={`w-full p-4 text-left hover:bg-gray-50 rounded-lg border transition-colors mb-2 
                            ${newActionData.type === type ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
                                                        onClick={() => setNewActionData(prev => ({ ...prev, type }))}
                                                    >
                                                        <div className="font-medium">{config.label}</div>
                                                        <div className="text-sm text-gray-500 mt-1">{config.description}</div>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex justify-end gap-2 mt-6">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setShowAddActionModal(false);
                                                        setNewActionData({ condition: '', tooltip: '', type: null });
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    disabled={!newActionData.type}
                                                    onClick={() => {
                                                        const newAction = {
                                                            id: Date.now(),
                                                            type: newActionData.type,
                                                            condition: newActionData.condition,
                                                            tooltip: newActionData.tooltip,
                                                            isEditing: true
                                                        };

                                                        setStateActions(prev => ({
                                                            ...prev,
                                                            [selectedState.id]: [...(prev[selectedState.id] || []), newAction]
                                                        }));
                                                        setShowAddActionModal(false);
                                                        setNewActionData({ condition: '', tooltip: '', type: null });
                                                    }}
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Transitions */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-gray-900">Transitions</h4>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => setShowAddTransitionModal(true)}
                                        >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Transition
                                    </Button>

                                    {showAddTransitionModal && selectedState && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                        <h2 className="text-lg font-medium mb-4">Add New Transition</h2>
                                        
                                        <div className="space-y-4">
                                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Target State
                                            </label>
                                            <select 
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                                                value={newTransitionTarget}
                                                onChange={(e) => setNewTransitionTarget(e.target.value)}
                                            >
                                                <option value="">Select target state...</option>
                                                {states
                                                .filter(s => 
                                                    s.id !== selectedState.id && 
                                                    !transitions.some(t => 
                                                    t.from === selectedState.id && t.to === s.id
                                                    )
                                                )
                                                .map(state => (
                                                    <option key={state.id} value={state.id}>
                                                    {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                            </div>

                                            <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Transition Name
                                            </label>
                                            <Input 
                                                placeholder="e.g., Approve, Reject, Request Info"
                                                value={newTransitionName}
                                                onChange={(e) => setNewTransitionName(e.target.value)}
                                            />
                                            </div>

                                            <div className="flex justify-end gap-2 mt-6">
                                            <Button 
                                                variant="outline"
                                                onClick={() => {
                                                setShowAddTransitionModal(false);
                                                setNewTransitionTarget('');
                                                setNewTransitionName('');
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700"
                                                disabled={!newTransitionTarget || !newTransitionName}
                                                onClick={() => {
                                                const newTransition = {
                                                    id: Date.now(),
                                                    from: selectedState.id,
                                                    to: Number(newTransitionTarget),
                                                    name: newTransitionName,
                                                    condition: null
                                                };
                                                
                                                setTransitions(prev => [...prev, newTransition]);
                                                setShowAddTransitionModal(false);
                                                setNewTransitionTarget('');
                                                setNewTransitionName('');
                                                }}
                                            >
                                                Add Transition
                                            </Button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                <div className="space-y-2 p-4 bg-gray-50 rounded-lg min-h-[200px]">
                                    {transitions
                                        .filter(t => t.from === selectedState.id)
                                        .map(transition => (
                                            <div key={transition.id}
                                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                            >
                                                <span className="text-sm font-medium">
                                                    {transition.name} → {states.find(s => s.id === transition.to)?.name}
                                                </span>
                                                <X
                                                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                                                    onClick={() => handleDeleteTransition(transition.id)}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}

export { WorkflowDesigner };
