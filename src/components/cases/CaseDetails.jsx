import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { 
  User, 
  Calendar, 
  Clock, 
  MessageSquare, 
  FileText, 
  Activity,
  ChevronRight,
  AlertCircle,
  Paperclip,
  Send,
  ChevronDown,
  Plus,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function CaseDetails({onBack}) {
  const caseData = {
    id: 'TM-2024-001',
    title: 'High Value Transaction Alert',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Smith',
    createdAt: '2024-01-09T10:00:00',
    dueDate: '2024-01-11T18:00:00',
    description: 'Customer is unable to verify their account through the mobile app.',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      phone: '+1 234-567-8900'
    },
    // Available actions based on current state
    availableActions: [
        {
          id: 'resolve',
          label: 'Resolve Case',
          description: 'Mark the case as resolved',
          requiresComment: true,
          nextStatus: 'Resolved'
        },
        {
          id: 'escalate',
          label: 'Escalate',
          description: 'Escalate to senior support',
          requiresReason: true,
          nextStatus: 'Escalated'
        },
        {
          id: 'request-info',
          label: 'Request Information',
          description: 'Request additional information from customer',
          requiresMessage: true,
          nextStatus: 'Pending Customer'
        },
        {
          id: 'transfer',
          label: 'Transfer Case',
          description: 'Transfer to another team',
          requiresTeam: true,
          maintainsStatus: true
        }
      ]
  };

  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  // Mock attachment data - would come from API
  const attachmentDetails = {
    filename: 'screenshot.png',
    description: 'Customer account verification error screenshot',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-01-13T15:30:00',
    fileSize: '2.4 MB',
    fileType: 'image/png'
  };

  const timelineItems = useMemo(() => [
    {
      title: "Status changed to In Progress",
      timestamp: "2 hours ago",
      user: caseData.assignee,
      icon: <Activity className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-100"
    },
    {
      title: "Comment added",
      timestamp: "3 hours ago",
      user: "Sarah Johnson",
      icon: <MessageSquare className="w-4 h-4 text-green-600" />,
      iconBg: "bg-green-100"
    },
    {
      title: "Case assigned to team",
      timestamp: "4 hours ago",
      user: "System",
      icon: <User className="w-4 h-4 text-purple-600" />,
      iconBg: "bg-purple-100"
    },
    {
      title: "Document uploaded: verification.pdf",
      timestamp: "5 hours ago",
      user: "Michael Brown",
      icon: <FileText className="w-4 h-4 text-orange-600" />,
      iconBg: "bg-orange-100"
    },
    {
      title: "Priority changed to High",
      timestamp: "6 hours ago",
      user: "System",
      icon: <AlertCircle className="w-4 h-4 text-red-600" />,
      iconBg: "bg-red-100"
    },
    {
      title: "Case created",
      timestamp: "6 hours ago",
      user: "System",
      icon: <Plus className="w-4 h-4 text-gray-600" />,
      iconBg: "bg-gray-100"
    },
    {
      title: "Customer information updated",
      timestamp: "5 hours ago",
      user: "John Smith",
      icon: <User className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-100"
    },
    {
      title: "Due date updated",
      timestamp: "4 hours ago",
      user: "System",
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
      iconBg: "bg-yellow-100"
    }
  ], [caseData.assignee]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Cases
            </button>
            <ChevronRight className="w-4 h-4" />
            <span>{caseData.id}</span>
          </div>
          <h1 className="text-2xl font-bold">{caseData.title}</h1>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowActionsMenu(!showActionsMenu)}
          >
            Actions
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showActionsMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border divide-y z-50">
              {caseData.availableActions.map((action) => (
                <button
                  key={action.id}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3"
                  onClick={() => {
                    setSelectedAction(action);
                    setShowActionsMenu(false);
                  }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 mt-1 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">{selectedAction.label}</h2>
            
            <div className="space-y-4">
              {selectedAction.requiresComment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resolution Comment
                  </label>
                  <textarea 
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows={3}
                    placeholder="Enter resolution details..."
                  />
                </div>
              )}

              {selectedAction.requiresReason && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Escalation Reason
                  </label>
                  <select className="w-full rounded-md border border-gray-300 p-2">
                    <option value="">Select reason...</option>
                    <option>Technical complexity</option>
                    <option>Priority escalation</option>
                    <option>Customer request</option>
                  </select>
                </div>
              )}

              {selectedAction.requiresMessage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message to Customer
                  </label>
                  <textarea 
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows={3}
                    placeholder="Enter message to customer..."
                  />
                </div>
              )}

              {selectedAction.requiresTeam && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Team
                  </label>
                  <select className="w-full rounded-md border border-gray-300 p-2">
                    <option value="">Choose team...</option>
                    <option>Technical Support</option>
                    <option>Billing Support</option>
                    <option>Account Management</option>
                  </select>
                </div>
              )}

            {selectedAction?.isApprovalAction && (
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedAction.id === 'approve' ? 'Approval' : 'Rejection'} Comment
                </label>
                <textarea 
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows={3}
                    placeholder={`Enter ${selectedAction.id === 'approve' ? 'approval' : 'rejection'} comments...`}
                />
                </div>
                
                {selectedAction.requiresAttachment && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supporting Document
                    </label>
                    <div className="mt-1 flex items-center">
                    <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach File
                    </Button>
                    </div>
                </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">
                    Approval Summary
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                    <div>Case ID: {caseData.id}</div>
                    <div>Current Status: {caseData.status}</div>
                    <div>New Status: {selectedAction.nextStatus}</div>
                </div>
                </div>
            </div>
            )}

              <div className="flex justify-end gap-2 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedAction(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Handle action submission
                    setSelectedAction(null);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="col-span-2 space-y-6">
          {/* Case Information */}
          <div className="bg-white rounded-lg border">
            <div className="border-b px-6 py-3">
              <h2 className="font-medium">Case Information</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Status, Priority, and Case Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {caseData.status}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Priority</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {caseData.priority}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Case Type</div>
                  <div className="mt-1 text-sm font-medium">
                    Transaction Monitoring
                  </div>
                </div>
              </div>

              {/* Additional Case Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Created Date</div>
                  <div className="mt-1 text-sm font-medium">
                    {new Date(caseData.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Created By</div>
                  <div className="mt-1 text-sm font-medium">
                    Sarah Johnson
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Deadline</div>
                  <div className="mt-1 text-sm font-medium">
                    {new Date(caseData.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{caseData.description}</p>
              </div>

              {/* Timeline */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Timeline</h3>
                <div className="space-y-4">
                  {timelineItems.slice(currentPage * 5, (currentPage + 1) * 5).map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.timestamp} by {item.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Showing {currentPage * 5 + 1} to {Math.min((currentPage + 1) * 5, timelineItems.length)} of {timelineItems.length} entries
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={(currentPage + 1) * 5 >= timelineItems.length}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg border">
            <div className="border-b px-6 py-3">
              <h2 className="font-medium">Comments</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Comment Item */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">John Smith</span>
                        <span className="text-gray-500 text-sm ml-2">2 hours ago</span>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-600">
                      Reached out to customer for additional information about the verification issue.
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-4 mt-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      className="pr-24"
                      placeholder="Add a comment..."
                    />
                    <div className="absolute right-2 top-2 flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Send className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details and Related Info */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="bg-white rounded-lg border">
            <div className="border-b px-6 py-3">
              <h2 className="font-medium">Details</h2>
            </div>
            <div className="p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Assignee</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      JS
                    </div>
                    <span>{caseData.assignee}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Jan 9, 2024</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Jan 11, 2024</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg border">
            <div className="border-b px-6 py-3">
              <h2 className="font-medium">Customer</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    SW
                  </div>
                  <div>
                    <div className="font-medium">{caseData.customer.name}</div>
                    <div className="text-sm text-gray-500">{caseData.customer.email}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Phone</div>
                  <div>{caseData.customer.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-lg border">
            <div className="border-b px-6 py-3">
              <h2 className="font-medium">Attachments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">screenshot.png</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAttachmentModal(true)}
                  >
                    View
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Paperclip className="w-4 h-4 mr-2" />
                Add Files
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Attachment View Modal */}
      {showAttachmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Document Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAttachmentModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{attachmentDetails.filename}</div>
                  <div className="text-sm text-gray-500">{attachmentDetails.fileSize} • {attachmentDetails.fileType}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-sm text-gray-600">
                  {attachmentDetails.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Uploaded By
                  </label>
                  <p className="text-sm text-gray-600">
                    {attachmentDetails.uploadedBy}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Date
                  </label>
                  <p className="text-sm text-gray-600">
                    {format(new Date(attachmentDetails.uploadedAt), 'PPp')}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAttachmentModal(false)}
                >
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { CaseDetails };
