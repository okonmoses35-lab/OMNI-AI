import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  Sparkles,
  Package,
  Plus,
  Trash2,
  AlertTriangle,
  Send,
  Copy,
  Check,
  TrendingUp,
  MessageSquare,
  DollarSign
} from 'lucide-react';

export const OmniBusinessPage: React.FC = () => {
  const {
    inventory,
    addInventoryItem,
    updateInventoryQty,
    deleteInventoryItem,
    sendChatMessage,
    setCurrentPage,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'marketing' | 'inventory' | 'sales'>('marketing');
  const [copiedText, setCopiedText] = useState(false);

  // Marketing generator state
  const [productName, setProductName] = useState('Premium Ankara Fabrics (6 Yards)');
  const [productPrice, setProductPrice] = useState('12500');
  const [promoOffer, setPromoOffer] = useState('Buy 2 get free delivery within Lagos');
  const [targetAudience, setTargetAudience] = useState('Fashion lovers & event attendees (Aso Ebi)');
  const [generatedCopy, setGeneratedCopy] = useState<string>(
    `✨ NEW ARRIVAL ALERT! ✨\n\nUpgrade your wardrobe with authentic ${productName}!\n\n💰 Price: ₦12,500 only\n🎁 Special Deal: ${promoOffer}\n\n100% pure cotton, vibrant colours that never fade. Limited pieces available for our VIP customers.\n\n📲 Send a DM or WhatsApp message now to 080... to reserve your pattern before stock finishes! Fast nationwide delivery available 🚚💨`
  );

  // New inventory item state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Fashion');
  const [newItemQty, setNewItemQty] = useState('10');
  const [newItemPrice, setNewItemPrice] = useState('5000');

  const handleGenerateCopy = () => {
    const formattedPrice = Number(productPrice).toLocaleString();
    const copy = `🔥 OYA COME AND SEE! 🔥\n\n${productName.toUpperCase()} is officially back in stock! \n\nTargeted for: ${targetAudience}\n💵 Price: ₦${formattedPrice}\n🎉 Exclusive Promo: ${promoOffer}\n\nNo dull yourself! Quality dey speak for itself. DM or WhatsApp us directly right now to lock in your order.\n\n📍 Pickup available & express dispatch to your doorstep across Nigeria.`;
    setGeneratedCopy(copy);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    addInventoryItem({
      name: newItemName,
      category: newItemCategory,
      quantity: Number(newItemQty) || 1,
      unitPrice: Number(newItemPrice) || 0,
      lowStockThreshold: 5,
    });
    setNewItemName('');
  };

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const lowStockItems = inventory.filter((item) => item.quantity <= item.lowStockThreshold);

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 border border-cyan-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-lg">
              <Store className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">MODULE 08</span>
                <span className="rounded-md bg-cyan-950 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-800/40">
                  Nigerian SME Copilot
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniBusiness Suite</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                WhatsApp sales broadcast generator, stock monitoring, and Nigerian commerce assistant.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Help me write a persuasive WhatsApp broadcast message for month-end sales', 'omni_business');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Business AI</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex border-b border-slate-800 space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('marketing')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'marketing' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>WhatsApp & Social Promo Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'inventory' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Stock & Inventory Tracker</span>
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'sales' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Business Performance & Debts</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Marketing / WhatsApp Generator */}
      {activeTab === 'marketing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              <span>Broadcast & Caption Settings</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Product / Service Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Selling Price (₦)</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Target Category</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Fashion & Aso Ebi</option>
                    <option>Catering & Food Items</option>
                    <option>Gadgets & Tech Accessories</option>
                    <option>Beauty & Skincare</option>
                    <option>Home Essentials</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Special Discount or Incentive</label>
                <input
                  type="text"
                  value={promoOffer}
                  onChange={(e) => setPromoOffer(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleGenerateCopy}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 text-xs transition-all shadow-md shadow-cyan-950/40"
              >
                <Sparkles className="h-4 w-4" />
                <span>Regenerate High-Converting Copy</span>
              </button>
            </div>
          </div>

          {/* Generated Copy Preview & Actions */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Generated WhatsApp / Instagram Copy
                </span>
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-800">
                  Ready to Paste
                </span>
              </div>

              <textarea
                value={generatedCopy}
                onChange={(e) => setGeneratedCopy(e.target.value)}
                rows={9}
                className="w-full mt-3 rounded-2xl bg-slate-950 p-3.5 text-xs text-slate-200 border border-slate-800 leading-relaxed font-sans focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">Edit before publishing</span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 text-xs transition-colors shadow-md"
              >
                {copiedText ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Tracker */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Total Inventory Value</span>
              <p className="text-xl font-bold text-white mt-1">₦{totalInventoryValue.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Tracked Product Lines</span>
              <p className="text-xl font-bold text-white mt-1">{inventory.length} items</p>
            </div>
            <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Low Stock Alerts</span>
              <p className={`text-xl font-bold mt-1 ${lowStockItems.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {lowStockItems.length} items critical
              </p>
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={handleAddInventory} className="rounded-3xl bg-slate-900 p-5 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Add Product to Inventory</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Product name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500 sm:col-span-2"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                className="rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Unit Price (₦)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                className="rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 text-xs transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </form>

          {/* Table */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Current Stock List</h4>
              <span className="text-[11px] text-slate-400">Updated in Local Storage</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {inventory.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-950/40 transition-colors">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">{item.category}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">₦{item.unitPrice.toLocaleString()} per unit</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateInventoryQty(item.id, item.quantity - 1)}
                        className="h-6 w-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className={`font-mono font-bold px-1 ${item.quantity <= item.lowStockThreshold ? 'text-amber-400' : 'text-white'}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateInventoryQty(item.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => deleteInventoryItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                      title="Delete Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sales & Debts */}
      {activeTab === 'sales' && (
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-sm">Customer Debt & Payment Recovery Ledger</h3>
              <p className="text-slate-400 text-xs">Keep track of customers who took goods on credit</p>
            </div>
            <span className="rounded bg-rose-950 px-2 py-0.5 text-xs text-rose-400 font-bold border border-rose-800">
              Outstanding: ₦72,000
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Madam Blessing (Surulere)</span>
                <span className="text-slate-400 text-[11px]">3 Ankara packs • Due since Oct 14</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-bold text-rose-400 font-mono">₦37,500</span>
                <button
                  onClick={() => {
                    sendChatMessage('Write a polite but firm WhatsApp reminder to a customer owing ₦37,500 for Ankara', 'omni_business');
                    setCurrentPage('chat');
                  }}
                  className="rounded-lg bg-cyan-950 text-cyan-300 px-2.5 py-1 text-[11px] font-semibold border border-cyan-800 hover:bg-cyan-900"
                >
                  AI Reminder Copy →
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Alhaji Musa (Computer Village)</span>
                <span className="text-slate-400 text-[11px]">Rechargeable LED lamps • Due since Oct 18</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-bold text-rose-400 font-mono">₦34,500</span>
                <button
                  onClick={() => {
                    sendChatMessage('Write a polite WhatsApp follow-up reminder for an electronics wholesale payment of ₦34,500', 'omni_business');
                    setCurrentPage('chat');
                  }}
                  className="rounded-lg bg-cyan-950 text-cyan-300 px-2.5 py-1 text-[11px] font-semibold border border-cyan-800 hover:bg-cyan-900"
                >
                  AI Reminder Copy →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
