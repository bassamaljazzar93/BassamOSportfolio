
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SKILLS = [
  { name: 'Robotics & Control', level: 90, details: 'Inverse Kinematics, PID, Path Planning' },
  { name: 'Embedded Systems', level: 95, details: 'STM32, Arduino, ESP32, PCB Design' },
  { name: 'Software & AI', level: 85, details: 'Python, C++, PyTorch, React' },
  { name: 'Design & MFG', level: 95, details: 'SolidWorks, Fusion 360, 3D Printing, CNC' }
];

const SkillsApp: React.FC = () => {
  return (
    <div className="h-full bg-[#1a1a1a] p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-orange-500 uppercase tracking-tighter">Mechatronics Dashboard</h1>
          <p className="text-gray-500 mt-2 font-bold uppercase text-xs">Skills Telemetry Analysis</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map(skill => (
            <div key={skill.name} className="bg-black/40 rounded-2xl p-6 border border-white/5 hover:border-orange-500 transition-colors group relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 relative z-10">
                 <div>
                    <h3 className="text-lg font-black group-hover:text-orange-500 transition-colors uppercase">{skill.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1 font-bold">{skill.details}</p>
                 </div>
                 <div className="text-3xl font-black text-orange-500">{skill.level}%</div>
              </div>
              
              <div className="h-48 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Proficiency', value: skill.level },
                        { name: 'Gap', value: 100 - skill.level }
                      ]}
                      cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5}
                      dataKey="value" startAngle={90} endAngle={450}
                    >
                      <Cell fill="#E95420" stroke="none" />
                      <Cell fill="rgba(255,255,255,0.05)" stroke="none" />
                    </Pie>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                       itemStyle={{ color: '#E95420', fontSize: '10px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsApp;
