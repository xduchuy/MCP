import React, { useState, useEffect } from 'react';
import { 
  Cpu, Database, Mail, MessageSquare, Calendar, FileText, Zap, 
  Terminal, Layers, Search, Menu, X, Play, Code, ShieldCheck, 
  Activity, Box, Share2, Github, Monitor, Cloud, Layout, Server,
  Wifi, Fingerprint, Hexagon, LineChart, CreditCard, Users, Briefcase,
  Bot, Network, Component, FolderGit2, Radio
} from 'lucide-react';

const App = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);
  const [activeScenario, setActiveScenario] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('simulation'); // 'simulation' | 'ecosystem'
  
  // Metrics mô phỏng thời gian thực
  const [metrics, setMetrics] = useState({ latency: 12, bandwidth: 0.1, tokens: 0, encryption: 'AES-256' });

  // DỮ LIỆU HỆ SINH THÁI (Từ cung cấp của người dùng)
  const ecosystemData = {
    clients: [
      { name: "Claude Desktop", desc: "App máy tính của Anthropic, cài đặt Server 1-click.", icon: <Bot className="text-purple-400" /> },
      { name: "ChatGPT Desktop", desc: "Tích hợp giao thức MCP chính thức từ OpenAI.", icon: <MessageSquare className="text-emerald-400" /> },
      { name: "VS Code & Roo Code", desc: "IDE cho phép AI can thiệp mã nguồn qua MCP.", icon: <Code className="text-blue-400" /> },
      { name: "JetBrains IDEs", desc: "IntelliJ IDEA cấu hình MCP cho AI Assistant.", icon: <Box className="text-pink-400" /> },
      { name: "Các nền tảng khác", desc: "Replit, Zed, Sourcegraph, MS Semantic Kernel.", icon: <Layers className="text-cyan-400" /> }
    ],
    frameworks: [
      { name: "Claude Agent SDK", desc: "Zero trust, bảo mật nghiêm ngặt, tối ưu Claude.", icon: <ShieldCheck className="text-purple-400" /> },
      { name: "OpenAI Agents SDK", desc: "Tối giản, luồng ủy quyền, streaming thời gian thực.", icon: <Zap className="text-emerald-400" /> },
      { name: "Microsoft Agent", desc: "Phù hợp hệ sinh thái Azure, Python/.NET.", icon: <Layout className="text-blue-500" /> },
      { name: "Google ADK", desc: "Hỗ trợ Java/Python, tối ưu cho Gemini.", icon: <Search className="text-red-400" /> },
      { name: "CrewAI", desc: "Điều phối luồng công việc nhiều AI (Multi-agent).", icon: <Users className="text-orange-400" /> },
      { name: "mcp-agent", desc: "Thư viện Python nhẹ, tối ưu mẫu agent Anthropic.", icon: <Terminal className="text-slate-400" /> },
      { name: "Upsonic", desc: "Dành cho tài chính, chống khai thác lỗi LLM, quy mô lớn.", icon: <LineChart className="text-green-400" /> },
      { name: "Agno", desc: "Tốc độ cực cao, mã nguồn tối giản (10 dòng code).", icon: <Activity className="text-cyan-400" /> },
      { name: "DSPy", desc: "Tự động hóa tối ưu prompt, học từ ví dụ thực tế.", icon: <Component className="text-indigo-400" /> },
      { name: "LangChain", desc: "Hệ sinh thái kết hợp linh hoạt hàng trăm tools.", icon: <Network className="text-blue-300" /> },
      { name: "LlamaIndex", desc: "Chuyên ứng dụng nhận thức dữ liệu (RAG tinh vi).", icon: <Database className="text-fuchsia-400" /> },
      { name: "PydanticAI", desc: "Tập trung an toàn kiểu dữ liệu (type safety).", icon: <FileText className="text-yellow-400" /> }
    ],
    servers: [
      { name: "GitHub MCP", desc: "Tạo issue, PR, workflow, tìm kiếm mã nguồn.", icon: <Github className="text-slate-300" /> },
      { name: "Slack MCP", desc: "Gửi tin nhắn, quản lý kênh, reaction, tải file.", icon: <MessageSquare className="text-pink-400" /> },
      { name: "BigQuery Toolbox", desc: "Thực thi SQL Google Cloud, lấy thông tin bảng.", icon: <Database className="text-blue-400" /> },
      { name: "ClickHouse MCP", desc: "Truy vấn SQL dữ liệu phân tích thời gian thực.", icon: <Server className="text-yellow-500" /> },
      { name: "Windows CLI", desc: "Tự động hóa shell, powershell, tiến trình hệ thống.", icon: <Monitor className="text-cyan-400" /> },
      { name: "Figma Dev Mode", desc: "Trích xuất ngữ cảnh thiết kế, component, mã màu.", icon: <Component className="text-purple-400" /> },
      { name: "CData SharePoint", desc: "Kết nối tài liệu, danh sách mạng nội bộ an toàn.", icon: <Briefcase className="text-emerald-400" /> },
      { name: "Weather MCP", desc: "Open-Meteo API dự báo thời tiết thời gian thực.", icon: <Cloud className="text-sky-400" /> },
      { name: "Filesystem MCP", desc: "Truy cập cụ thể vào các tệp tin cục bộ trong máy tính.", icon: <FolderGit2 className="text-orange-400" /> },
      { name: "SaaS & Cloud", desc: "G.Analytics, Azure, Stripe, HubSpot, Snowflake.", icon: <Cloud className="text-blue-300" /> }
    ]
  };

  // Kịch bản mô phỏng
  const scenarios = [
    {
      id: "iot_hue",
      label: "Smart Home (Huế IoT)",
      icon: <Wifi className="w-4 h-4" />,
      color: "text-fuchsia-400",
      targetId: "home_assistant",
      framework: "CrewAI (Multi-Agent)",
      steps: [
        { node: 'hosts', msg: "User: 'Chuẩn bị nhà để tôi về nhé'", log: "Intention parsed. Triggering Home Automation Agent.", rpc: '{"method": "agent/trigger", "params": {"task": "home_prep"}}' },
        { node: 'client', msg: "CrewAI giao việc cho IoT Agent", log: "Agent 1 (Weather) & Agent 2 (IoT) synchronized.", rpc: '{"swarm": "active", "agents": ["weather", "iot"]}' },
        { node: 'protocol', msg: "MCP định tuyến song song đa luồng", log: "Quantum routing: Multiplexing 2 connections.", rpc: '{"status": "multiplexing", "channels": 2}' },
        { node: 'servers', msg: "Home Assistant Server nhận lệnh", log: "Executing device commands via Local Network...", rpc: '{"action": "set_state", "entity_id": "climate.living_room"}' },
        { node: 'connector', msg: "Bật điều hòa 24°C, mở đèn hiên", log: "Success. Devices online and configured.", rpc: '{"result": {"ac": "24C", "lights": "on", "door": "locked"}}' },
        { node: 'hosts', msg: "AI báo cáo nhà đã sẵn sàng đón bạn", log: "All agent tasks complete. Summarizing.", rpc: null }
      ],
      finalOutput: "Chào mừng bạn sắp về nhà tại Huế! Do ngoài trời đang 32°C, tôi đã bật điều hòa phòng khách ở mức 24°C và mở sẵn đèn hiên. Chúc bạn một buổi tối thư giãn!"
    },
    {
      id: "github",
      label: "DevOps (GitHub)",
      icon: <Github className="w-4 h-4" />,
      color: "text-blue-500",
      targetId: "github",
      framework: "Claude Agent SDK",
      steps: [
        { node: 'hosts', msg: "User: 'Tạo PR cho branch feature-x'", log: "Request: create_pull_request(repo: 'husc-dev')", rpc: '{"method": "github/create_pr", "params": {"base": "main", "head": "feature-x"}}' },
        { node: 'client', msg: "Claude Desktop gửi qua Agent SDK", log: "SDK: Validating GitHub OAuth token...", rpc: '{"auth": "bearer_token", "scope": "repo"}' },
        { node: 'protocol', msg: "MCP Protocol định tuyến tới GitHub Server", log: "Routing to mcp-server-github", rpc: '{"status": "forwarding"}' },
        { node: 'servers', msg: "GitHub Server gọi API REST", log: "POST /repos/husc-dev/pulls", rpc: '{"action": "api_call", "endpoint": "github.v3"}' },
        { node: 'connector', msg: "PR #124 đã được tạo thành công", log: "Response 201 Created", rpc: '{"result": {"url": "github.com/husc-dev/pull/124"}}' },
        { node: 'hosts', msg: "AI thông báo link PR cho bạn", log: "Process complete.", rpc: null }
      ],
      finalOutput: "Tôi đã tạo Pull Request #124 thành công trên repository 'husc-dev'. Trạng thái build đang xanh, bạn có thể merge ngay."
    },
    {
      id: "windows",
      label: "Auto (Win CLI)",
      icon: <Monitor className="w-4 h-4" />,
      color: "text-cyan-400",
      targetId: "windows",
      framework: "Agno Framework",
      steps: [
        { node: 'hosts', msg: "User: 'Dọn dẹp RAM máy tính giúp tôi'", log: "Executing: optimize_memory()", rpc: '{"method": "win_cli/exec", "params": {"cmd": "Clear-MemoryCache"}}' },
        { node: 'client', msg: "Agno Framework ánh xạ Tool siêu tốc", log: "Agno: Fast-mapping tool to Windows Server", rpc: '{"latency": "0.8ms"}' },
        { node: 'protocol', msg: "MCP Bridge cấp quyền mức Admin", log: "Security Check: PRIVILEGED_EXECUTE", rpc: '{"access": "authorized_admin"}' },
        { node: 'servers', msg: "Windows Server chạy lệnh PowerShell", log: "PowerShell: Invoking system kernel call...", rpc: '{"shell": "pwsh", "status": "running"}' },
        { node: 'connector', msg: "Giải phóng thành công 3.5GB RAM", log: "Success. System optimized.", rpc: '{"result": {"freed_ram": "3.5GB", "status": "optimal"}}' },
        { node: 'hosts', msg: "AI báo cáo máy đã hoạt động mượt mà", log: "Analysis complete.", rpc: null }
      ],
      finalOutput: "Đã hoàn tất dọn dẹp hệ thống! Tôi đã đóng các tiến trình ngầm không cần thiết và giải phóng được 3.5GB RAM. Máy tính của bạn hiện đang ở trạng thái tối ưu."
    },
    {
      id: "sharepoint",
      label: "Enterprise (Doc)",
      icon: <Database className="w-4 h-4" />,
      color: "text-emerald-500",
      targetId: "sharepoint",
      framework: "LangChain",
      steps: [
        { node: 'hosts', msg: "User: 'Tìm báo cáo tài chính Q1'", log: "LangChain: Invoking SharePoint RAG Tool", rpc: '{"method": "sharepoint/search", "params": {"query": "Q1 Finance"}}' },
        { node: 'client', msg: "LangChain Client điều phối yêu cầu", log: "Selecting mcp-cdata-sharepoint provider", rpc: '{"tool": "sharepoint_search_v2"}' },
        { node: 'protocol', msg: "MCP truyền tải mã hóa cấp doanh nghiệp", log: "Enterprise TLS Encryption active", rpc: '{"security": "level_3"}' },
        { node: 'servers', msg: "CData Server truy vấn thư viện SharePoint", log: "Querying SharePoint Doc Library...", rpc: '{"db_query": "SELECT Content FROM Finance WHERE Name LIKE \'%Q1%\'"}' },
        { node: 'connector', msg: "Trích xuất dữ liệu doanh thu Q1", log: "Document stream received.", rpc: '{"file_id": "FIN-2026-Q1"}' },
        { node: 'hosts', msg: "AI tạo biểu đồ tóm tắt doanh thu", log: "Context updated.", rpc: null }
      ],
      finalOutput: "Dựa trên Báo cáo tài chính Q1 (File: FIN-2026-Q1), doanh thu công ty đạt 2.5 triệu USD, tăng 15% so với cùng kỳ năm ngoái. Chi phí vận hành giảm 5%."
    }
  ];

  const components = {
    hosts: { title: "1. AI Client / Host", icon: <Layout className="w-8 h-8 text-cyan-400" />, description: "Ứng dụng máy khách (Claude, ChatGPT, IDE) tương tác trực tiếp với người dùng.", details: ["Xử lý ngôn ngữ tự nhiên", "Hiển thị UI/UX", "Tích hợp Context cuối"] },
    client: { title: "2. Agent Framework", icon: <Terminal className="w-8 h-8 text-fuchsia-400" />, description: "Các bộ SDK lõi (LangChain, Agno, CrewAI) thiết lập 'não bộ' cho Agent.", details: ["Quản lý Tool & Agent Swarm", "Bảo mật & Ủy quyền", "Tối ưu hóa hiệu năng"] },
    protocol: { title: "3. MCP Quantum Hub", icon: <Layers className="w-8 h-8 text-indigo-400" />, description: "Giao thức tiêu chuẩn hóa, vận chuyển dữ liệu siêu tốc và an toàn tuyệt đối.", details: ["JSON-RPC qua TLS", "Định tuyến song song", "Chuẩn hóa Schema"] },
    servers: { title: "4. MCP Connectors", icon: <Zap className="w-8 h-8 text-emerald-400" />, description: "Các 'plugin' phần cứng/phần mềm thực thi tác vụ trên thế giới thực.", details: ["Giao tiếp Local/Cloud API", "Kiểm soát phần cứng (IoT)", "Đọc/Ghi cơ sở dữ liệu"] }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setShowResult(false);
    setSimStep(0);
    setLogs([]);
    setMetrics({ latency: 8, bandwidth: 0.5, tokens: 0, encryption: 'QUANTUM-TLS' });
    setActiveStep(scenarios[activeScenario].steps[0].node);
  };

  // Cập nhật metrics
  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setMetrics(prev => ({ 
          latency: Math.floor(Math.random() * 15) + 2, 
          bandwidth: +(Math.random() * 10 + 5).toFixed(1), 
          tokens: prev.tokens + Math.floor(Math.random() * 150) + 50,
          encryption: Math.random() > 0.85 ? 'RE-KEYING...' : 'QUANTUM-TLS'
        }));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Luồng chạy mô phỏng
  useEffect(() => {
    if (isSimulating && simStep < scenarios[activeScenario].steps.length) {
      const timer = setTimeout(() => {
        const currentStepData = scenarios[activeScenario].steps[simStep];
        setLogs(prev => [...prev, { 
          time: new Date().toLocaleTimeString(), 
          msg: currentStepData.log, 
          rpc: currentStepData.rpc, 
          isWarning: Math.random() > 0.75 
        }]);
        setActiveStep(currentStepData.node);
        
        if (simStep < scenarios[activeScenario].steps.length - 1) {
          setSimStep(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsSimulating(false);
            setSimStep(-1);
            setShowResult(true);
            setMetrics(prev => ({ ...prev, latency: 5, bandwidth: 0.0, encryption: 'STANDBY' })); 
          }, 1500);
        }
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, simStep]);

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.15),rgba(255,255,255,0))] pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#030712]/70 backdrop-blur-2xl border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between h-auto md:h-20 py-4 md:py-0">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.location.reload()}>
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative p-2.5 bg-[#0b1221] rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-500/30 group-hover:rotate-[180deg] transition-transform duration-700">
                  <Fingerprint className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 tracking-tighter">MCP QUANTUM</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                   <Activity className={`w-3 h-3 ${isSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} /> 
                   {isSimulating ? 'Neural Net Active' : 'System Ready'}
                </span>
              </div>
            </div>

            {/* TAB CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 md:mt-0 bg-[#0a1122]/90 p-1.5 rounded-[1.5rem] md:rounded-[1.25rem] border border-white/[0.03] shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] w-full sm:w-auto">
              <button 
                onClick={() => setActiveTab('simulation')}
                className={`w-full sm:w-auto px-7 py-3 md:py-2.5 rounded-[1.25rem] md:rounded-[1rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeTab === 'simulation' 
                    ? 'bg-[#0dc5e0] text-[#050b14] shadow-[0_0_25px_rgba(13,197,224,0.3)] saturate-150' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                Live Simulation
              </button>
              <button 
                onClick={() => setActiveTab('ecosystem')}
                className={`w-full sm:w-auto px-7 py-3 md:py-2.5 rounded-[1.25rem] md:rounded-[1rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeTab === 'ecosystem' 
                    ? 'bg-[#0dc5e0] text-[#050b14] shadow-[0_0_25px_rgba(13,197,224,0.3)] saturate-150' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                Ecosystem Matrix
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* ======================= CHẾ ĐỘ 1: ECOSYSTEM MATRIX ======================= */}
        {activeTab === 'ecosystem' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                Mạng lưới <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">Model Context Protocol</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Hệ sinh thái MCP bao gồm 3 lớp khổng lồ cho phép AI giao tiếp với toàn bộ thế giới số. Dưới đây là danh sách các tích hợp hiện tại.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Cột 1: Clients */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6 border-b border-cyan-500/20 pb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg"><Layout className="w-6 h-6 text-cyan-400" /></div>
                  <h3 className="text-xl font-black text-white tracking-tighter">1. Ứng dụng / Client</h3>
                </div>
                {ecosystemData.clients.map((item, i) => (
                  <div key={i} className="bg-[#0b1221]/80 backdrop-blur border border-white/5 p-5 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-1 group shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#030712] rounded-xl border border-white/5 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cột 2: Frameworks */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6 border-b border-fuchsia-500/20 pb-4">
                  <div className="p-2 bg-fuchsia-500/10 rounded-lg"><Terminal className="w-6 h-6 text-fuchsia-400" /></div>
                  <h3 className="text-xl font-black text-white tracking-tighter">2. Frameworks & SDKs</h3>
                </div>
                <div className="grid gap-4 md:max-h-[800px] md:overflow-y-auto pr-2 custom-scrollbar">
                  {ecosystemData.frameworks.map((item, i) => (
                    <div key={i} className="bg-[#0b1221]/80 backdrop-blur border border-white/5 p-5 rounded-2xl hover:border-fuchsia-500/50 transition-all hover:-translate-y-1 group shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#030712] rounded-xl border border-white/5 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">{item.name}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cột 3: Servers */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6 border-b border-emerald-500/20 pb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg"><Server className="w-6 h-6 text-emerald-400" /></div>
                  <h3 className="text-xl font-black text-white tracking-tighter">3. MCP Servers</h3>
                </div>
                <div className="grid gap-4 md:max-h-[800px] md:overflow-y-auto pr-2 custom-scrollbar">
                  {ecosystemData.servers.map((item, i) => (
                    <div key={i} className="bg-[#0b1221]/80 backdrop-blur border border-white/5 p-5 rounded-2xl hover:border-emerald-500/50 transition-all hover:-translate-y-1 group shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#030712] rounded-xl border border-white/5 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">{item.name}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= CHẾ ĐỘ 2: LIVE SIMULATION ======================= */}
        {activeTab === 'simulation' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
            {/* Left: Simulation Canvas */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-[#0b1221]/80 backdrop-blur-xl p-3 rounded-3xl border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(34,211,238,0.05)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 z-0"></div>
                <div className="flex items-center gap-2 relative z-10 w-full lg:w-auto overflow-x-auto no-scrollbar pb-3 lg:pb-0 px-2 group-hover:cursor-grab">
                  {scenarios.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => { setActiveScenario(idx); setShowResult(false); }}
                      disabled={isSimulating}
                      className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 ${activeScenario === idx ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className={`flex justify-center items-center gap-3 w-full md:w-auto px-8 py-3.5 rounded-2xl font-black text-sm transition-all relative group z-10 overflow-hidden ${isSimulating ? 'bg-slate-800 text-slate-500 cursor-wait' : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-95'}`}
                >
                  {!isSimulating && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                  {isSimulating ? <Activity className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5 fill-current relative z-10" />}
                  <span className="relative z-10">{isSimulating ? "SYSTEM ACTIVE" : "INITIATE SEQUENCE"}</span>
                </button>
              </div>

              {/* Visualizer Stage */}
              <div className="bg-[#060b14] rounded-[2.5rem] md:rounded-[3rem] border border-cyan-500/10 p-6 md:p-16 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] shadow-2xl">
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <defs>
                    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                      <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <path d="M 50% 120 L 50% 280" stroke="#1e293b" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                  <path d="M 50% 360 L 50% 480" stroke="#1e293b" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                  {isSimulating && (
                    <>
                      <path d="M 50% 120 L 50% 280" stroke="url(#laserGrad)" strokeWidth="4" strokeDasharray="50 150" fill="none" className="animate-[laserFlow_1.5s_linear_infinite]" filter="url(#glow)" />
                      <path d="M 50% 360 L 50% 480" stroke="url(#laserGrad)" strokeWidth="4" strokeDasharray="50 150" fill="none" className="animate-[laserFlow_1.5s_linear_infinite]" filter="url(#glow)" />
                    </>
                  )}
                </svg>

                {isSimulating && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top duration-300 pointer-events-none">
                    <div className="px-6 py-2.5 bg-[#020617]/90 backdrop-blur-xl rounded-full border border-cyan-500/30 flex items-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                      <span className="text-cyan-300 font-bold text-xs uppercase tracking-widest">{scenarios[activeScenario].steps[simStep]?.msg}</span>
                    </div>
                  </div>
                )}

                <div className="relative flex flex-col items-center gap-10 md:gap-14 w-full max-w-2xl z-10">
                  <div className={`group relative transition-all duration-500 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border flex flex-col items-center gap-4 w-full max-w-[280px] overflow-hidden ${activeStep === 'hosts' ? 'bg-[#0f172a] border-cyan-400 scale-105 md:scale-110 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'bg-[#0b1221] border-white/5 opacity-60'}`}>
                    {activeStep === 'hosts' && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite]"></div>}
                    <div className={`p-4 rounded-2xl relative z-10 transition-all ${activeStep === 'hosts' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-500'}`}>
                      <Layout className="w-10 h-10" />
                    </div>
                    <div className="text-center relative z-10">
                      <span className={`font-black text-xl tracking-tighter uppercase ${activeStep === 'hosts' ? 'text-white' : 'text-slate-500'}`}>AI FRONTEND</span>
                      <p className="text-[9px] font-bold text-cyan-500/70 uppercase tracking-[0.2em] mt-1">Interaction Layer</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 items-center w-full">
                    <div className={`relative overflow-hidden transition-all duration-500 p-6 rounded-3xl border flex flex-col items-center gap-3 w-48 ${activeStep === 'client' ? 'bg-[#0f172a] border-fuchsia-400 scale-110 shadow-[0_0_40px_rgba(232,121,249,0.2)]' : 'bg-[#0b1221] border-white/5 opacity-60'}`}>
                      {activeStep === 'client' && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-400/10 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite]"></div>}
                      <div className={`p-3 rounded-2xl relative z-10 ${activeStep === 'client' ? 'bg-fuchsia-500 text-slate-900 shadow-[0_0_15px_rgba(232,121,249,0.5)]' : 'bg-slate-800 text-slate-500'}`}>
                        <Terminal className="w-7 h-7" />
                      </div>
                      <div className="text-center relative z-10">
                        <span className={`font-bold text-xs uppercase tracking-widest ${activeStep === 'client' ? 'text-white' : 'text-slate-500'}`}>Framework</span>
                        <p className="text-[9px] text-fuchsia-400 mt-1">{scenarios[activeScenario].framework}</p>
                      </div>
                    </div>

                    <div className={`relative transition-all duration-1000 p-8 rounded-full border-4 flex flex-col items-center justify-center gap-1 w-44 h-44 ${activeStep === 'protocol' ? 'bg-[#0b1221] border-indigo-400 scale-125 shadow-[0_0_60px_rgba(129,140,248,0.4)] rotate-[360deg]' : 'bg-[#0b1221] border-white/5 opacity-60'}`}>
                      {activeStep === 'protocol' && <div className="absolute inset-0 rounded-full border-4 border-indigo-400/50 animate-ping"></div>}
                      <Layers className={`w-12 h-12 ${activeStep === 'protocol' ? 'text-indigo-400' : 'text-slate-600'}`} />
                      <span className={`font-black text-2xl tracking-tighter ${activeStep === 'protocol' ? 'text-white' : 'text-slate-500'}`}>MCP</span>
                    </div>

                    <div className={`relative overflow-hidden transition-all duration-500 p-6 rounded-3xl border flex flex-col items-center gap-3 w-48 ${activeStep === 'servers' ? 'bg-[#0f172a] border-emerald-400 scale-110 shadow-[0_0_40px_rgba(52,211,153,0.2)]' : 'bg-[#0b1221] border-white/5 opacity-60'}`}>
                      {activeStep === 'servers' && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite]"></div>}
                      <div className={`p-3 rounded-2xl relative z-10 ${activeStep === 'servers' ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-slate-800 text-slate-500'}`}>
                        <Server className="w-7 h-7" />
                      </div>
                      <div className="text-center relative z-10">
                        <span className={`font-bold text-xs uppercase tracking-widest leading-tight ${activeStep === 'servers' ? 'text-white' : 'text-slate-500'}`}>MCP Server<br/>Connector</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
                    {[
                      { id: 'github', icon: <Github />, label: "GitHub", active: activeScenario === 1 && activeStep === 'connector' },
                      { id: 'windows', icon: <Monitor />, label: "Win CLI", active: activeScenario === 2 && activeStep === 'connector' },
                      { id: 'sharepoint', icon: <Database />, label: "SharePoint", active: activeScenario === 3 && activeStep === 'connector' },
                      { id: 'iot_hue', icon: <Radio />, label: "Hue IoT", active: activeScenario === 0 && activeStep === 'connector' }
                    ].map((item) => (
                      <div key={item.id} className={`p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl border transition-all duration-700 flex flex-col items-center gap-2 md:gap-3 relative overflow-hidden ${item.active ? `bg-[#0f172a] border-cyan-400 scale-110 shadow-[0_20px_40px_rgba(34,211,238,0.2)] -translate-y-4` : 'bg-[#0b1221] border-white/5 opacity-30'}`}>
                        {item.active && <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>}
                        <div className={`p-3 rounded-2xl relative z-10 ${item.active ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-500'}`}>
                          {item.icon}
                        </div>
                        <span className={`font-black text-[10px] uppercase tracking-widest relative z-10 ${item.active ? 'text-white' : 'text-slate-500'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md flex items-center justify-center z-50 p-8 animate-in zoom-in duration-500">
                    <div className="bg-[#0b1221] rounded-[3rem] p-10 max-w-xl w-full shadow-[0_0_80px_rgba(34,211,238,0.2)] border border-cyan-500/30 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400"></div>
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30">
                           <ShieldCheck className="w-8 h-8" />
                         </div>
                         <div>
                           <h3 className="text-2xl font-black text-white leading-none tracking-tight">System Report</h3>
                           <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">✓ Context Successfully Synthesized</p>
                         </div>
                      </div>
                      <div className="bg-[#030712] p-6 rounded-2xl border border-white/5 relative shadow-inner">
                        <div className="absolute top-2 left-3 text-4xl text-cyan-500/10 font-serif">"</div>
                        <p className="text-slate-300 leading-relaxed font-medium italic relative z-10 text-lg">
                          {scenarios[activeScenario].finalOutput}
                        </p>
                      </div>
                      <button 
                        onClick={() => setShowResult(false)}
                        className="mt-8 w-full py-4 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-400 border border-white/10 hover:border-cyan-500/50 rounded-2xl font-black text-sm transition-all uppercase tracking-widest"
                      >
                        ACKNOWLEDGE & CLOSE
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Technical Inspector */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-[#0b1221]/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 min-h-[360px] relative overflow-hidden group shadow-2xl">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                 {activeStep ? (
                   <div className="relative z-10 animate-in fade-in slide-in-from-right duration-500">
                     <div className="flex items-center gap-4 mb-6">
                       <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                         {components[activeStep]?.icon || scenarios[activeScenario].icon}
                       </div>
                       <div>
                         <h2 className="text-2xl font-black text-white tracking-tighter leading-none">
                           {components[activeStep]?.title || "Connector"}
                         </h2>
                         <div className="flex items-center gap-1 mt-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div> Link Active
                         </div>
                       </div>
                     </div>
                     <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium italic border-l-2 border-cyan-500/50 pl-4">
                       "{components[activeStep]?.description || "Processing real-world execution payload."}"
                     </p>
                     <div className="space-y-3">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node Capabilities:</span>
                       {components[activeStep]?.details.map((detail, i) => (
                         <div key={i} className="flex items-center gap-3 p-3 bg-[#030712] rounded-xl border border-white/5 transform hover:translate-x-1 transition-transform">
                           <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 text-[10px] flex items-center justify-center font-black border border-cyan-500/20">
                             {i + 1}
                           </div>
                           <span className="text-xs font-bold text-slate-300">{detail}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-30 group-hover:opacity-60 transition-opacity">
                     <Wifi className="w-16 h-16 mb-4 text-cyan-500" />
                     <h3 className="font-black text-white uppercase tracking-tighter text-lg">Awaiting Uplink</h3>
                     <p className="text-xs font-bold text-slate-500 mt-2 italic">Select sequence to begin monitoring...</p>
                   </div>
                 )}
              </div>

              {/* Glitch Console / Live Feed */}
              <div className="bg-[#02050c] rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden h-[420px] flex flex-col group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                
                <div className="flex flex-col gap-4 mb-6 relative z-10 shrink-0 border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_8px_#ef4444]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_#eab308]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_#10b981]"></div>
                      </div>
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">SECURE RPC CONSOLE</span>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/10 rounded-md text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em] border border-cyan-500/30 animate-pulse">
                      {metrics.encryption || 'AES-256'}
                    </div>
                  </div>
                  
                  {/* Digital HUD Dashboard */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#050b14] border border-white/5 p-2 rounded-lg flex flex-col items-center">
                      <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Ping</span>
                      <span className={`text-xs font-mono font-black ${metrics.latency > 25 ? 'text-yellow-400' : 'text-emerald-400'}`}>{metrics.latency}ms</span>
                    </div>
                    <div className="bg-[#050b14] border border-white/5 p-2 rounded-lg flex flex-col items-center">
                      <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Rate</span>
                      <span className="text-xs font-mono font-black text-cyan-400">{metrics.bandwidth}mb/s</span>
                    </div>
                    <div className="bg-[#050b14] border border-white/5 p-2 rounded-lg flex flex-col items-center">
                      <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">TKS</span>
                      <span className="text-xs font-mono font-black text-fuchsia-400">{metrics.tokens}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar font-mono text-[11px] relative z-10 flex-1 flex flex-col justify-end">
                  {logs.length === 0 && (
                    <div className="flex items-center gap-3 text-slate-600 pb-6 opacity-70">
                      <span className="animate-pulse">█</span>
                      <span className="tracking-widest">System idle. Terminal waiting...</span>
                    </div>
                  )}
                  <div className="space-y-5">
                    {logs.map((log, i) => (
                      <div key={i} className={`animate-in slide-in-from-bottom-2 duration-300 space-y-2 mb-2 pl-4 py-1 border-l-2 ${log.isWarning ? 'border-yellow-500/60' : 'border-cyan-500/40'}`}>
                        <div className="flex justify-between items-start">
                          <span className={`${log.isWarning ? 'text-yellow-400' : 'text-cyan-400'} font-black text-[10px]`}>[{log.time}]</span>
                          <span className={`text-right text-xs font-medium ${log.isWarning ? 'text-yellow-200/70 glitch' : 'text-slate-400 italic'}`}>{log.msg}</span>
                        </div>
                        {log.rpc && (
                          <div className={`bg-[#050b14] p-3.5 rounded-xl border leading-relaxed break-all relative group shadow-inner ${log.isWarning ? 'border-yellow-500/20 text-yellow-400/90' : 'border-white/5 text-emerald-400/90'}`}>
                            <span className="typewriter inline-block overflow-hidden whitespace-nowrap border-r-2 border-transparent font-bold tracking-tight">
                              {log.rpc}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="h-4 shrink-0"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#02050c] via-[#02050c]/90 to-transparent pointer-events-none rounded-b-[3rem] z-10"></div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 mt-4 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
          <div className="flex items-center gap-3 opacity-40">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <span className="text-lg font-black text-white tracking-widest">QUANTUM NEXUS</span>
          </div>
          <div className="flex gap-8 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Protocol Core</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 self-center"></span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Ecosystem Matrix</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 self-center"></span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Security Ledger</span>
          </div>
          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">
             © 2026 Advanced AI Architecture Visualization
          </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes laserFlow { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        .typing-effect { animation: typing 1s steps(40, end); }
        
        .typewriter { 
          animation: typing 1.5s steps(40, end), blink-cursor .75s step-end infinite;
          white-space: nowrap;
          overflow: hidden;
        }
        @keyframes typing { from { width: 0; opacity: 0; } to { width: 100%; opacity: 1; } }
        @keyframes blink-cursor { from, to { border-color: transparent } 50% { border-color: rgba(34,211,238,0.8); } }
        
        .glitch {
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 1px) }
          40% { transform: translate(-2px, -1px) }
          60% { transform: translate(2px, 1px) }
          80% { transform: translate(2px, -1px) }
          100% { transform: translate(0) }
        }
      `}} />
    </div>
  );
};

export default App;