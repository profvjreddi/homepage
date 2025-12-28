import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface IntersectionData {
  id: string;
  name: string;
  description: string;
  examples: string[];
  position: { x: number; y: number };
}

const ResearchIntersectionViz: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedIntersection, setSelectedIntersection] = useState<IntersectionData | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const getHoverText = () => {
    if (!hoveredArea) {
      return "Hover over circles to highlight areas • Click intersection points for details";
    }
    
    const areaDescriptions = {
      'ca': 'Building efficient, reliable computing systems from the ground up—from energy-aware processors to hardware-software co-design that enables real-world deployment',
      'mls': 'Creating scalable systems for edge AI deployment—TinyML frameworks, runtime optimization, and ultra-low-power inference platforms that bring intelligence to physical environments',
      'aa': 'Developing Physical AI systems that perceive, reason, and act safely in real-world environments—the ultimate goal of intelligence in the physical world'
    };
    
    return areaDescriptions[hoveredArea as keyof typeof areaDescriptions] || "Hover over circles to highlight areas • Click intersection points for details";
  };

  const researchAreas = [
    {
      id: 'ca',
      name: 'Computer Architecture',
      color: '#A51C30',
      position: { x: 220, y: 150 },
      radius: 120,
      description: 'Building efficient and reliable computing systems'
    },
    {
      id: 'mls',
      name: 'ML Systems',
      color: '#A51C30',
      position: { x: 380, y: 150 },
      radius: 120,
      description: 'Scalable systems for edge AI deployment'
    },
    {
      id: 'aa',
      name: 'Autonomous Agents',
      color: '#A51C30',
      position: { x: 300, y: 300 },
      radius: 120,
      description: 'Physical AI systems for real-world environments'
    }
  ];

  // Calculate proper intersection positions based on circle geometry
  const calculateIntersectionPoint = (circle1: any, circle2: any, offset = 0.5) => {
    const dx = circle2.position.x - circle1.position.x;
    const dy = circle2.position.y - circle1.position.y;
    
    // For the CA-MLS intersection (pink dot), it should be exactly halfway between the centers
    // since both circles are at the same y-level (150)
    const ratio = offset;
    return {
      x: circle1.position.x + dx * ratio,
      y: circle1.position.y + dy * ratio
    };
  };

  const calculateCentroid = (points: any[]) => {
    // Calculate the geometric center of the triangle formed by the circle centers
    // CA: (200, 150), MLS: (400, 150), AA: (300, 280)
    // The centroid should be at the center of the actual overlapping region
    
    const x = points.reduce((sum, p) => sum + p.position.x, 0) / points.length; // = 300
    const y = points.reduce((sum, p) => sum + p.position.y, 0) / points.length; // = 193.33
    
    // Fine-tune to be in the visual center of the intersection
    return { x: x, y: y - 8 }; // Slightly higher to be in the true intersection
  };

  const intersections: IntersectionData[] = [
    {
      id: 'ca-mls',
      name: 'Efficient ML Systems',
      description: 'Making machine learning systems run efficiently on real hardware through co-design and optimization',
      examples: [
        'TinyML frameworks for microcontrollers',
        'Hardware-aware model optimization',
        'Energy-efficient inference accelerators'
      ],
      position: { x: 300, y: 135 } // Pink dot - moved up to be centered in CA-MLS intersection
    },
    {
      id: 'mls-aa',
      name: 'Intelligent Agents',
      description: 'ML-powered systems that can perceive, reason, and act autonomously in real environments',
      examples: [
        'Real-time perception and decision making',
        'Adaptive behavior in changing environments',
        'Safety-aware autonomous systems'
      ],
      position: { x: 355, y: 235 } // Blue dot - moved right and down for MLS-AA intersection
    },
    {
      id: 'ca-aa',
      name: 'Reliable Autonomy',
      description: 'Building robust computing platforms that can safely operate autonomous systems',
      examples: [
        'Fault-tolerant computing for robots',
        'Real-time systems for safety-critical applications',
        'Edge computing for autonomous vehicles'
      ],
      position: { x: 245, y: 235 } // Green dot - moved left and down for CA-AA intersection
    },
    {
      id: 'ca-mls-aa',
      name: 'Physical AI',
      description: 'The ultimate goal: intelligent systems that safely and efficiently operate in the physical world',
      examples: [
        'Complete AI stack for physical deployment',
        'Self-optimizing autonomous robots',
        'Real-world AI with safety guarantees'
      ],
      position: { x: 300, y: 205 } // Gold dot - manually centered in all three intersections
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 450;

    // Create gradients and patterns for the circles
    const defs = svg.append('defs');
    
    // Define colors for intersection points
    const intersectionColors = {
      'ca-mls': '#E8B4CB',      // Pink blend
      'mls-aa': '#B4D4E8',     // Blue blend  
      'ca-aa': '#D4E8B4',      // Green blend
      'ca-mls-aa': '#FFD700'   // Gold for center
    };
    
    researchAreas.forEach(area => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${area.id}`)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', area.color)
        .attr('stop-opacity', hoveredArea === area.id ? 0.4 : 0.25);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', area.color)
        .attr('stop-opacity', hoveredArea === area.id ? 0.2 : 0.1);
    });

    // Draw research area circles
    const circles = svg.selectAll('.research-circle')
      .data(researchAreas)
      .enter()
      .append('circle')
      .attr('class', 'research-circle')
      .attr('cx', d => d.position.x)
      .attr('cy', d => d.position.y)
      .attr('r', d => d.radius)
      .attr('fill', d => `url(#gradient-${d.id})`)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        setHoveredArea(d.id);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 3);
      })
      .on('mouseout', function(event, d) {
        setHoveredArea(null);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 2);
      });

    // Simple approach with colored dots at intersections

    // Add labels for research areas with text wrapping
    const areaLabels = svg.selectAll('.area-label-group')
      .data(researchAreas)
      .enter()
      .append('g')
      .attr('class', 'area-label-group')
      .style('pointer-events', 'none');

    areaLabels.each(function(d) {
      const group = d3.select(this);
      const words = d.name.split(' ');
      
      // Adjust text positions to move them away from the center overlap
      let textX = d.position.x;
      let textY = d.position.y;
      
      if (d.id === 'ca') {
        // Computer Architecture - move left and slightly up
        textX = d.position.x - 45;
        textY = d.position.y - 25;
      } else if (d.id === 'mls') {
        // ML Systems - move right and slightly up
        textX = d.position.x + 45;
        textY = d.position.y - 25;
      } else if (d.id === 'aa') {
        // Autonomous Agents - move down and center
        textX = d.position.x;
        textY = d.position.y + 45;
      }
      
      if (words.length === 2) {
        // Two lines for "Computer Architecture", "Autonomous Agents"
        group.append('text')
          .attr('x', textX)
          .attr('y', textY - 10)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(words[0]);
          
        group.append('text')
          .attr('x', textX)
          .attr('y', textY + 5)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(words[1]);
      } else if (words.length === 3) {
        // Three lines for "Machine Learning Systems"
        group.append('text')
          .attr('x', textX)
          .attr('y', textY - 15)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(words[0]);
          
        group.append('text')
          .attr('x', textX)
          .attr('y', textY)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(words[1]);
          
        group.append('text')
          .attr('x', textX)
          .attr('y', textY + 15)
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(words[2]);
      }
    });

    // Add intersection points as colored dots
    const intersectionPoints = svg.selectAll('.intersection-point')
      .data(intersections)
      .enter()
      .append('circle')
      .attr('class', 'intersection-point')
      .attr('cx', d => d.position.x)
      .attr('cy', d => d.position.y)
      .attr('r', d => d.id === 'ca-mls-aa' ? 8 : 6)
      .attr('fill', d => intersectionColors[d.id as keyof typeof intersectionColors])
      .attr('stroke', '#A51C30')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        setSelectedIntersection(d);
      })
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.id === 'ca-mls-aa' ? 12 : 9)
          .attr('stroke-width', 3);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.id === 'ca-mls-aa' ? 8 : 6)
          .attr('stroke-width', 2);
      });

  }, [hoveredArea]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Research Area Intersections
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Click on the intersection points to explore how our research areas connect
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <svg
              ref={svgRef}
              width="600"
              height="450"
              viewBox="0 0 600 450"
              className="w-full h-auto border border-gray-200 rounded-lg"
            />
          </div>
          
          {selectedIntersection && (
            <div className="lg:w-80 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">
                  {selectedIntersection.name}
                </h4>
                <button
                  onClick={() => setSelectedIntersection(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {selectedIntersection.description}
              </p>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">
                  Key Examples:
                </h5>
                <ul className="space-y-2">
                  {selectedIntersection.examples.map((example, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#A51C30] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto min-h-[3rem] flex items-center justify-center">
            {getHoverText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchIntersectionViz;
