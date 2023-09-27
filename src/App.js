import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Forgot from './pages/forgot';
import Home from './pages/home';
import BasicInformation from './pages/basic_information';
import PermissionSettings from './pages/user_rights_management/PermissionSettings';
import PermissionGroupList from './pages/user_rights_management/permissionGroupList';
import ReconcilationDaily from './pages/financialManagement/ReconcilationDaily';
import ChannelReport from './pages/financialManagement/ChannelReport';
import MerchantChannelReport from './pages/financialManagement/MerchantChannelReport';
import DebitCard from './pages/financialManagement/DebitCard';
import DebitCardEntryRecord from './pages/financialManagement/DebitCardEntryRecord';
import DebitCardBalanceOperators from './pages/financialManagement/DebitCardBalanceOperators';
import DebitCardReport from './pages/financialManagement/DebitCardReport';
import ReceiptMainGate from './pages/collection_management/ReceiptMainGate';
import BankCardManagement from './pages/collection_management/BankCardManagement';
import MomoManagement from './pages/collection_management/MomoManagement';
import VittlePayManagement from './pages/collection_management/VittlePayManagement';
import ZaloManagement from './pages/collection_management/ZaloManagement';
import DeviceManagement from './pages/collection_management/DeviceManagement';
import BankBalanceSheet from './pages/collection_management/BankBalanceSheet';
import CollectionDaily from './pages/collection_management/CollectionDaily';
import CollectionCardOutRecord from './pages/collection_management/CollectionCardOutRecord';
import ReceiptReport from './pages/collection_management/ReceiptReport';

import Issuer from './pages/relase_management/Issuer';
import IssuePersonnelReport from './pages/relase_management/IssuePersonnelReport';
import ShiftList from './pages/relase_management/ShiftList';
import ProxyList from './pages/agent_management/ProxyList';
import AgencyProfitReport from './pages/agent_management/AgencyProfitReport';
import AgencySettlementReport from './pages/agent_management/AgentSettlementReport';
import AgencySettlementList from './pages/agent_management/AgentSettlementList';
import MerchantList from './pages/merchant_management/MerchantList';
import AuditList from './pages/merchant_management/AuditList';
import OrderList from './pages/merchant_management/OrderList';
import DropList from './pages/merchant_management/DropList';
import RefundList from './pages/merchant_management/RefundList';
import FillingList from './pages/merchant_management/FillingList';
import MonitorList from './pages/monitor_management/MonitorList';
import CarList from './pages/monitor_management/CarList';
import SettlementList from './pages/settlement_list';
import BackgroundIpWhitelist from './pages/background_ip_whitelist';
import OperationLog from './pages/operation_log';
import Rollover from './pages/rollover';
import GoogleAuthenticator from './pages/google_authenticator';
import ChangePassword from './pages/change_password';
import SetUp from './pages/set_up';
import PaymentAPI from './pages/access_guide/PaymentAPI';
import NotFound from './pages/not_found';
import BadDebitReport from './pages/relase_management/BadDebitReport';
import SchedulingOverview from './pages/relase_management/SchedulingOverview';
import DailyReport from './pages/relase_management/DailyReport';
import BadDebitList from './pages/relase_management/BadDebitList';
import Test from './pages/Test';
import PermissionEditSetting from './pages/user_rights_management/permissionEditSettings';
import { ConfigProvider } from 'antd';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // <Router>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EB6932',
        },
      }}
    >
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" replace={true} />} />
          {/* Test API */}
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forgot" element={<Forgot />} />
          {/* Home */}
          <Route exact path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          {/* Basic Information */}
          <Route exact path="/basic-information" element={<PrivateRoute><BasicInformation /></PrivateRoute>} />
          {/* User Rights Management */}
          <Route exact path="/permission-settings" element={<PrivateRoute><PermissionSettings /></PrivateRoute>} />
          <Route exact path="/permission-settings/:id/:account" element={<PrivateRoute><PermissionEditSetting /></PrivateRoute>} />
          <Route exact path="/permission-group-list" element={<PrivateRoute><PermissionGroupList /></PrivateRoute>} />
          {/* Financial Management */}
          <Route exact path="/reconcilation-daily" element={<PrivateRoute><ReconcilationDaily /></PrivateRoute>} />
          <Route exact path="/channel-report" element={<PrivateRoute><ChannelReport /></PrivateRoute>} />
          <Route exact path="/merchant-channel-report" element={<PrivateRoute><MerchantChannelReport /></PrivateRoute>} />
          <Route exact path="/debit-card" element={<PrivateRoute><DebitCard /></PrivateRoute>} />
          <Route exact path="/debit-card-entry-record" element={<PrivateRoute><DebitCardEntryRecord /></PrivateRoute>} />
          <Route exact path="/debit-card-balance-operators" element={<PrivateRoute><DebitCardBalanceOperators /></PrivateRoute>} />
          <Route exact path="/debit-card-report" element={<PrivateRoute><DebitCardReport /></PrivateRoute>} />
          {/* Collection Management */}
          <Route exact path="/receipt-main-gate" element={<PrivateRoute><ReceiptMainGate /></PrivateRoute>} />
          <Route exact path="/bank-card-management" element={<PrivateRoute><BankCardManagement /></PrivateRoute>} />
          <Route exact path="/momo-management" element={<PrivateRoute><MomoManagement /></PrivateRoute>} />
          <Route exact path="/vittlepay-management" element={<PrivateRoute><VittlePayManagement /></PrivateRoute>} />
          <Route exact path="/zalo-management" element={<PrivateRoute><ZaloManagement /></PrivateRoute>} />
          <Route exact path="/device-management" element={<PrivateRoute><DeviceManagement /></PrivateRoute>} />
          <Route exact path="/bank-balance-sheet" element={<PrivateRoute><BankBalanceSheet /></PrivateRoute>} />
          <Route exact path="/collection-daily" element={<PrivateRoute><CollectionDaily /></PrivateRoute>} />
          <Route exact path="/receipt-report" element={<PrivateRoute><ReceiptReport /></PrivateRoute>} />
          <Route exact path="/collection-card-out-record" element={<PrivateRoute><CollectionCardOutRecord /></PrivateRoute>} />
          {/* Release Management */}
          <Route exact path="/issuer" element={<PrivateRoute><Issuer /></PrivateRoute>} />
          <Route exact path="/issue-personnel-report" element={<PrivateRoute><IssuePersonnelReport /></PrivateRoute>} />
          <Route exact path="/shift-list" element={<PrivateRoute><ShiftList /></PrivateRoute>} />
          <Route exact path="/scheduling-overview" element={<PrivateRoute><SchedulingOverview /></PrivateRoute>} />
          <Route exact path="/daily-report" element={<PrivateRoute><DailyReport /></PrivateRoute>} />
          <Route exact path="/bad-debit-list" element={<PrivateRoute><BadDebitList /></PrivateRoute>} />
          <Route exact path="/bad-debit-report" element={<PrivateRoute><BadDebitReport /></PrivateRoute>} />
          {/* Agent Management */}
          <Route exact path="/proxy-list" element={<PrivateRoute><ProxyList /></PrivateRoute>} />
          <Route exact path="/agency-profit-report" element={<PrivateRoute><AgencyProfitReport /></PrivateRoute>} />
          <Route exact path="/agent-settlement-report" element={<PrivateRoute><AgencySettlementReport /></PrivateRoute>} />
          <Route exact path="/agent-settlement-list" element={<PrivateRoute><AgencySettlementList /></PrivateRoute>} />
          {/* Merchant Management */}
          <Route exact path="/merchant-list" element={<PrivateRoute><MerchantList /></PrivateRoute>} />
          <Route exact path="/audit-list" element={<PrivateRoute><AuditList /></PrivateRoute>} />
          <Route exact path="/order-list" element={<PrivateRoute><OrderList /></PrivateRoute>} />
          <Route exact path="/drop-list" element={<PrivateRoute><DropList /></PrivateRoute>} />
          <Route exact path="/refund-list" element={<PrivateRoute><RefundList /></PrivateRoute>} />
          <Route exact path="/filling-list" element={<PrivateRoute><FillingList /></PrivateRoute>} />
          {/* Monitor Management */}
          <Route exact path="/monitor-list" element={<PrivateRoute><MonitorList /></PrivateRoute>} />
          <Route exact path="/car-list" element={<PrivateRoute><CarList /></PrivateRoute>} />
          {/* Settlement List */}
          <Route exact path="/settlement-list" element={<PrivateRoute><SettlementList /></PrivateRoute>} />
          {/* Background IP Whitelist */}
          <Route exact path="/background-ip-whitelist" element={<PrivateRoute><BackgroundIpWhitelist /></PrivateRoute>} />
          {/* Operation Log */}
          <Route exact path="/operation-log" element={<PrivateRoute><OperationLog /></PrivateRoute>} />
          {/* Rollover */}
          <Route exact path="/rollover/:cardID?" element={<PrivateRoute><Rollover /></PrivateRoute>} />
          {/* Google Authenticator */}
          <Route exact path="/google-authenticator" element={<PrivateRoute><GoogleAuthenticator /></PrivateRoute>} />
          {/* Change Password */}
          <Route exact path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          {/* Set Up */}
          <Route exact path="/set-up" element={<PrivateRoute><SetUp /></PrivateRoute>} />
          {/* Access Guide */}
          <Route exact path="/access-guide/payment-api" element={<PrivateRoute><PaymentAPI /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </ConfigProvider>
    // </Router>
  );
}

export default App;