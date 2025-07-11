var severityColor = IIF($feature.Severity == 1, '#f0ad4e', IIF($feature.Severity == 2, '#d9534f', '#5cb85c'));

return {
  type: 'text',
  text: `
  <div style="font-family: 'Segoe UI', sans-serif; color: #333;">
    <h2 style="color: #2a7ae2; margin-bottom: 0;">🚨 Validation Error</h2>
    <p style="margin-top: 0; font-size: 0.9em; color: #666;">Feature ID: <strong>${$feature.FeatureObjectID}</strong></p>

    <hr style="border: none; border-top: 1px solid #ccc;"/>

    <h3 style="color: #d9534f;">❗ Error Details</h3>
    <ul style="list-style: none; padding-left: 0;">
      <li><strong>Error #:</strong> ${$feature.ErrorNumber}</li>
      <li><strong>Message:</strong> ${$feature.ErrorMessage}</li>
      <li><strong>Severity:</strong> <span style="color: ${severityColor};">${$feature.Severity}</span></li>
      <li><strong>Status:</strong> ${$feature.ErrorStatus}</li>
      <li><strong>Phase:</strong> ${$feature.ErrorPhase}</li>
    </ul>

    <h3 style="color: #5bc0de;">📏 Rule Info</h3>
    <ul style="list-style: none; padding-left: 0;">
      <li><strong>Rule:</strong> ${$feature.RuleName}</li>
      <li><strong>Description:</strong> ${$feature.RuleDescription}</li>
      <li><strong>Type:</strong> ${$feature.RuleType}</li>
    </ul>

    <h3 style="color: #5cb85c;">🛠️ Metadata</h3>
    <ul style="list-style: none; padding-left: 0;">
      <li><strong>Created:</strong> ${$feature.CreationDate}</li>
      <li><strong>By:</strong> ${$feature.Creator}</li>
      <li><strong>Updated:</strong> ${$feature.LastUpdate}</li>
      <li><strong>By:</strong> ${$feature.UpdatedBy}</li>
    </ul>

    <hr style="border: none; border-top: 1px solid #ccc;"/>
    <p style="font-size: 0.8em; color: #999;">Global ID: ${$feature.GlobalID}</p>
  </div>
  `
}
