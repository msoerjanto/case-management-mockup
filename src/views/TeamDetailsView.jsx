import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { UserPlus, Search, Filter, ChevronRight, Settings } from "lucide-react";

function TeamDetailsView({ teamId, onBack }) {
  // Mock team data - would come from API
  const team = {
    id: teamId,
    name: 'Customer Support',
    description: 'Front-line customer service team',
    lead: 'Sarah Johnson',
    members: [
      {
        id: 1,
        name: 'Balgis Harris',
        email: 'balgis.harris@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 8
      },
      {
        id: 2,
        name: 'Syaadilla Rahma',
        email: 'syaadilla.rahma@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 5
      },
      {
        id: 3,
        name: 'Chrisanty Rea',
        email: 'chrisanty.rea@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Offline',
        activeCases: 7
      },
      {
        id: 4,
        name: 'Marshelly Apriani',
        email: 'marshelly.apriani@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 6
      },
      {
        id: 5,
        name: 'Ubaid Ubaidilah',
        email: 'ubaid.ubaidilah@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 9
      },
      {
        id: 6,
        name: 'Novita Permatasari',
        email: 'novita.permatasari@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 4
      },
      {
        id: 7,
        name: 'Itsna Imroatul Hanifa',
        email: 'itsna.hanifa@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Offline',
        activeCases: 8
      },
      {
        id: 8,
        name: 'Cornelius Aguswibowo',
        email: 'cornelius.aguswibowo@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 6
      },
      {
        id: 9,
        name: 'Muhammad Renaldy Saputra',
        email: 'muhammad.saputra@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 7
      },
      {
        id: 10,
        name: 'Ingga Sari Utami',
        email: 'ingga.utami@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 5
      },
      {
        id: 11,
        name: 'Shendy Pratiwi',
        email: 'shendy.pratiwi@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Offline',
        activeCases: 8
      },
      {
        id: 12,
        name: 'Helmi Rahmatullah',
        email: 'helmi.rahmatullah@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 6
      },
      {
        id: 13,
        name: 'Nanda Silalahi',
        email: 'nanda.silalahi@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 7
      },
      {
        id: 14,
        name: 'Prih Ariyanti',
        email: 'prih.ariyanti@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 5
      },
      {
        id: 15,
        name: 'Endang Listia',
        email: 'endang.listia@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Offline',
        activeCases: 9
      },
      {
        id: 16,
        name: 'Anindita Hildani',
        email: 'anindita.hildani@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 6
      },
      {
        id: 17,
        name: 'Valensia Elvani',
        email: 'valensia.elvani@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 7
      },
      {
        id: 18,
        name: 'Skolastika Nugraha',
        email: 'skolastika.nugraha@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 5
      },
      {
        id: 19,
        name: 'Avidia Larasati',
        email: 'avidia.larasati@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Offline',
        activeCases: 8
      },
      {
        id: 20,
        name: 'Mukhamad Wahyana',
        email: 'mukhamad.wahyana@superbank.id',
        role: '90 - AML Ops Maker',
        status: 'Online',
        activeCases: 6
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Teams
            </button>
          </div>
          <h1 className="text-2xl font-bold">{team.name}</h1>
          <p className="text-gray-500">{team.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Team Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Total Members</div>
          <div className="text-2xl font-bold mt-2">{team.members.length}</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Active Now</div>
          <div className="text-2xl font-bold mt-2 text-green-600">
            {team.members.filter(m => m.status === 'Online').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Active Cases</div>
          <div className="text-2xl font-bold mt-2 text-blue-600">
            {team.members.reduce((sum, m) => sum + m.activeCases, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Avg Response Time</div>
          <div className="text-2xl font-bold mt-2">28m</div>
        </div>
      </div>

      {/* Member List */}
      <div className="bg-white rounded-lg border">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="font-medium">Team Members</h2>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search members..." />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Cases</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {team.members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{member.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    member.status === 'Online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{member.activeCases}</td>
                <td className="px-6 py-4 text-sm">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TeamDetailsView };
