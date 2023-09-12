import React from "react";
import "./style.css";
import MenuSmell from "./menuSmell";
const SmellMainComponent: React.FC = () => {
  return (
    <div className="center">
      {/* Menu */}
      <MenuSmell></MenuSmell>
      <table className="text">
        <tbody>
          <tr>
            <td width="1500">
              The three graphs accessible above (PCA distribution, Descriptor
              Variance, Cluster by PCA) produced from the AJX Proof of Concept
              (PoC) on optimizing the aroma of vegan croissants in comparison to
              butter croissants, provide valuable insights into the distribution
              of molecular properties and aroma impressions, the variance among
              descriptors, and the correlation between molecular properties and
              aroma impressions.
              <br />
              <br />
              One way to digitize scents and flavors is through smell
              prediction, which involves clustering data of different smells
              based on their molecular descriptors. Molecular descriptors can be
              calculated from the SMILES representation of the molecule, which
              is a string of characters that encodes the molecular structure. By
              analyzing the molecular descriptors, we can predict the different
              kinds of smells and flavors that a product may have.
              <br />
              <br />
              Overall, the ability to digitize scents and flavors is an
              important tool for product development (and quality control). With
              the help of advanced technologies such as machine learning and
              data analysis, we can gain a better understanding of the molecular
              composition of smells and flavors, which can lead to the creation
              of more effective and desirable products.
              <br />
              <br />
              <a href="http://www.ajinomatrix.org" target="_blank">
                www.ajinomatrix.org
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="logo">
        <tbody>
          <tr>
            <td>
              <img
                src={process.env.PUBLIC_URL + "/bg-start.jpg"}
                width="1500"
                alt="Background"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SmellMainComponent;
